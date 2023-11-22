using AutoMapper;
using mefApi.Dtos;
using mefApi.Enums;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class AvanceController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 
        public AvanceController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("avances")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var avances = await uow.AvanceRepository.GetAllAsync();
            var avancesDto = mapper.Map<List<AvanceDto>>(avances);
            
            return Ok(avancesDto);
        }

        private decimal calculSolde(AvanceInfosDto avance) {
            decimal solde = 0;
            if(avance.AvanceDebourse is not null) {
                solde += avance.AvanceDebourse.MontantApprouve;
            }
            if(avance.Mouvements is not null) {
                foreach(var mvt in avance.Mouvements) {
                    if(mvt.TypeOperation == TypeOperation.Credit) {
                        solde -= mvt.Montant;
                    } 
                }
            }
            return solde;
        }

        private decimal calculMontantPayeEcheance(EcheanceAvanceDto echeance){
            decimal solde = 0;
            if(echeance.Mouvements is not null) {
                foreach(var mvt in echeance.Mouvements) {
                    if(mvt.TypeOperation == TypeOperation.Credit) {
                        solde += mvt.Montant;
                    }
                }
            }

            return solde; 
        }

        private StatusPret getStatus(AvanceInfosDto avance) {
            if(avance.AvanceDebourse is null) {
                return StatusPret.ENREGISTRE;
            }

            decimal montantAvance = 0; 
            montantAvance += avance.AvanceDebourse.MontantApprouve;
            
            if(avance.Solde == montantAvance) {
                return StatusPret.DEBOURSE;
            }

            if(avance.Solde == 0) {
                return StatusPret.SOLDE;
            }
            return StatusPret.ENCOURS;
        }

        [HttpPost("debourser")]
        public async Task<IActionResult> Debourser(MouvementDto mouvementDto)
        {
            if(mouvementDto.Id != 0) {
                return BadRequest("Ce mouvement existe déjà dans la bdd");
            }
            var mouvement = mapper.Map<Mouvement>(mouvementDto);
            
            mouvement.ModifiePar = GetUserId();
            mouvement.ModifieLe = DateTime.Now;
            uow.MouvementRepository.Add(mouvement);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("MouvementAdded");
            await signalrHub.Clients.All.SendAsync("AvanceAdded");
            await signalrHub.Clients.All.SendAsync("DeboursementAdded");
            return StatusCode(201);
        }

        [HttpGet("echeances")]
        public async Task<IActionResult> GetEcheances()
        {
            // var echeances = await uow.EcheanceAvanceRepository.GetAllAsync();
            // var echeancesDto = new List<EcheanceAvanceDto>();
            // if(echeances is not null) {
            //     echeancesDto = mapper.Map<List<EcheanceAvanceDto>>(echeances);
            // }

            // if(echeancesDto is not null) {
            //     foreach(var echeance in echeancesDto) {
            //         echeance.MontantPaye = calculMontantPayeEcheance(echeance);
            //     }
            // }
            
            return Ok();
        }

        [HttpPost("rembourserEcheances")] 
        public async Task<IActionResult> RembourserEcheances(InfosRbAvanceDto infos)
        {
            // foreach(var echeanceDto in infos.Echeancier) {
            //     var echeance = await uow.EcheanceAvanceRepository.FindByIdAsync(echeanceDto.Id);
            //     if(echeance is null) {
            //         return NotFound("Cette échéances n'existe pas");
            //     }

            //     var avance = await uow.AvanceRepository.FindByIdAsync(echeance.AvanceId);
            //     if(avance is null) {
            //         return NotFound("Ce crédit n'existe pas dans la base de données");
            //     }

            //     var membre = await uow.MembreRepository.FindByIdAsync(avance.MembreId);
            //     if(membre is null) {
            //         return NotFound("Ce membre n'existe pas dans la base de données");
            //     }

            //     // MOUVEMENT DE REMBOURSEMENT CREDIT
            //     var mouvement = new Mouvement();
            //     mouvement.Avance = avance;
            //     mouvement.Membre = membre;
            //     mouvement.DateMvt = infos.DateMouvement;
            //     mouvement.TypeOperation = TypeOperation.Credit;
            //     mouvement.GabaritId = 1;
            //     mouvement.Libelle = "Remboursement écheance avance N° " + echeance.AvanceId + " du " + echeance.DateEcheance;
            //     mouvement.Montant = echeanceDto.Montant;
            //     mouvement.ModifiePar = GetUserId();
            //     mouvement.ModifieLe = DateTime.Now;
            //     mouvement.EcheanceAvance = echeance;
            //     uow.MouvementRepository.Add(mouvement);
            // }
            // await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("AvanceAdded");
            return StatusCode(201);
        }


        [HttpPost("add")]
        public async Task<IActionResult> Add(AvanceDto avanceDto)
        {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            var membre = await uow.MembreRepository.FindByIdAsync(avanceDto.MembreId);
            if(membre is null) {
                return NotFound("Cet utilisateur n'existe pas");
            }

            var avance = mapper.Map<Avance>(avanceDto);

            avance.ModifiePar = GetUserId();
            avance.ModifieLe = DateTime.Now;
            avance.Membre = membre;
            uow.AvanceRepository.Add(avance);

            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("AvanceAdded");
            return StatusCode(201);
        }

        [HttpPost("debourseravance/{id}")]
        public async Task<IActionResult> DebourserAvance(int id, AvanceDebourseDto avanceDto)
        {
            // if(!ModelState.IsValid) 
            //     return BadRequest(ModelState);

            // var avance = await uow.AvanceRepository.FindByIdAsync(id);
            // if(avance is null) {
            //     return NotFound("Cet credit n'existe pas dans la base de données");
            // }

            // var membre = await uow.MembreRepository.FindByIdAsync(avance.MembreId);
            // if(membre is null) {
            //     return NotFound("Ce membre n'existe pas dans la base de données");
            // }

            // // MOUVEMENT DE DEBOURSEMENT
            // var mouvement = new Mouvement();
            // mouvement.Avance = avance;
            // mouvement.Membre = membre;
            // mouvement.DateMvt = avanceDto.DateDecaissement;
            // mouvement.TypeOperation = TypeOperation.Debit;
            // mouvement.GabaritId = 1;
            // mouvement.Libelle = "Déboursement avance N° " + id + " du " + avance.DateDemande;
            // if (avanceDto.MontantApprouve != 0){
            //     mouvement.Montant = avanceDto.MontantApprouve;
            // }
            // mouvement.ModifiePar = GetUserId();
            // mouvement.ModifieLe = DateTime.Now;
            // uow.MouvementRepository.Add(mouvement);

            // var avanceDebourse = mapper.Map<AvanceDebourse>(avanceDto);
            // avanceDebourse.Avance = avance;
            // avanceDebourse.Mouvement = mouvement;
            // avanceDebourse.ModifiePar = GetUserId();
            // avanceDebourse.ModifieLe = DateTime.Now;
            // uow.AvanceDebourseRepository.Add(avanceDebourse);

            // await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("AvanceAdded");
            return StatusCode(201);
        }

        
    }
}