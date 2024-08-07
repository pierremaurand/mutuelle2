using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using mefApi.HubConfig;

namespace mefApi.Controllers
{
    public class CotisationController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public CotisationController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpPost("addCotisation/{id}")]
        public async Task<IActionResult> AddCotisations(int id,CotisationDto cotisationDto)
        {
            var membre = await uow.MembreRepository.FindByIdAsync(id);

            if(membre is null) {
                return NotFound("Ce membre n'existe pas");
            }

            if(cotisationDto.Id != 0) {
                return BadRequest("Cette cotisation existe déjà");
            }

            // MOUVEMENT D"ENREGISTREMENT DE LA COTISATION DU MOIS
            var cotisation = mapper.Map<Cotisation>(cotisationDto);
            cotisation.Membre = membre;
            cotisation.ModifiePar = GetUserId();
            cotisation.ModifieLe = DateTime.Now;
            uow.CotisationRepository.Add(cotisation);

            var mois = await uow.MoisRepository.FindAsync(cotisation.MoisId);
            var dateMvt = cotisation.Annee + "-" + "01" + "-25";
            if(mois is not null && mois.Valeur is not null) {
                dateMvt = cotisation.Annee + "-" + mois.Valeur + "-25";
            }

            // MOUVEMENT D"ENREGISTREMENT DE LA COTISATION DU MOIS
            var mouvement = new Mouvement();
            mouvement.Cotisation = cotisation;
            mouvement.Membre = membre;
            var libelle = "Cotisation du 01/" + cotisation.Annee;
            if(mois is not null) {
                libelle = "Cotisation du " + mois.Valeur + "/" + cotisation.Annee;
            }
            mouvement.DateMvt = dateMvt;
            mouvement.TypeOperation = TypeOperation.Credit;
            mouvement.Libelle = libelle;
            if (cotisation.Montant != 0){
                mouvement.Montant = cotisation.Montant;
            }
            mouvement.ModifiePar = GetUserId();
            mouvement.ModifieLe = DateTime.Now;
            uow.MouvementRepository.Add(mouvement);

            // RETENU 10%
            mouvement = new Mouvement();
            mouvement.Cotisation = cotisation;
            mouvement.Membre = membre;
            libelle = "Cotisation du 01/" + cotisation.Annee;
            if(mois is not null) {
                libelle = "Retenu des 10% sur cotisation du  " + mois.Valeur + "/" + cotisation.Annee;
            }
            mouvement.DateMvt = dateMvt;
            mouvement.TypeOperation = TypeOperation.Debit;
            mouvement.Libelle = libelle;
            if (cotisation.Montant != 0){
                mouvement.Montant = (cotisation.Montant * 1) / 10;
            }
            mouvement.ModifiePar = GetUserId();
            mouvement.ModifieLe = DateTime.Now;
            uow.MouvementRepository.Add(mouvement);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("CotisationAdded");
            await signalrHub.Clients.All.SendAsync("MouvementAdded");
            return StatusCode(201);
        }

        [HttpGet("cotisations")]
        public async Task<IActionResult> GetAll()
        {
            var cotisations = await uow.CotisationRepository.GetAllAsync();
            if(cotisations is null) {
                return NotFound("Aucune cotisation n'est enregistré dans la bdd");
            }

            var cotisationsDto = mapper.Map<List<CotisationDto>>(cotisations);
            return Ok(cotisationsDto);
        }

        private Decimal calculSolde(ICollection<Cotisation>? cotisations) {
            decimal solde = 0;
            if(cotisations is not null) {
                foreach(var cotisation in cotisations) {
                    solde += cotisation.Montant;
                }
            }

            return solde;
        }


        [HttpGet("cotisation/{id}")]
        public async Task<IActionResult> GetAllCotisationsById(int id)
        {
            var membre = await uow.MembreRepository.FindByIdAsync(id);
        
            if(membre is null) {
                return NotFound("Ce membre n'existe pas");
            }
            
            var cotisationMembre = mapper.Map<CotisationMembreDto>(membre);
            cotisationMembre.Solde = calculSolde(membre.Cotisations);
            return Ok(cotisationMembre);
        }

        [HttpGet("mois")]
        public async Task<IActionResult> GetAllMois()
        {
            var mois = await uow.MoisRepository.GetAllAsync();
            if(mois is null) {
                return NotFound();
            }
            var moisDto = mapper.Map<IEnumerable<MoisDto>>(mois);
            return Ok(moisDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var membre = await uow.MembreRepository.FindByIdAsync(id);
            if(membre is null) {
                return NotFound();
            }
            var membreDto = mapper.Map<MembreDto>(membre);
            return Ok(membreDto);
        }

    }
}