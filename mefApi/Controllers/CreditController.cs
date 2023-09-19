using AutoMapper;
using mefApi.Dtos;
using mefApi.Enums;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using mefApi.HubConfig;

namespace mefApi.Controllers
{
    public class CreditController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public CreditController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("credits")]
        public async Task<IActionResult> GetAll()
        {
            var credits = await uow.CreditRepository.GetAllAsync();
            var creditsDto = new List<CreditInfosDto>();
            if(credits is not null) {
                creditsDto = mapper.Map<List<CreditInfosDto>>(credits);
            }

            foreach(var credit in creditsDto) {
                credit.Solde = calculSolde(credit);
                credit.Status = getStatus(credit);
                if(credit.Echeancier is not null) {
                    foreach(var echeance in credit.Echeancier) {
                        echeance.MontantPaye = calculMontantPayeEcheance(echeance);
                    }
                }
            }
            
            
            return Ok(creditsDto);
        }

        [HttpGet("echeances")]
        public async Task<IActionResult> GetAllEcheances()
        {
            // var echeances = await uow.EcheanceCreditRepository.GetAllAsync();
            // var echeancesDto = new List<EcheanceCreditDto>();
            // if(echeances is not null) {
            //     echeancesDto = mapper.Map<List<EcheanceCreditDto>>(echeances);
            // }

            // if(echeancesDto is not null) {
            //     foreach(var echeance in echeancesDto) {
            //         echeance.MontantPaye = calculMontantPayeEcheance(echeance);
            //     }
            // }
            
            return Ok();
        }

        private decimal calculSolde(CreditInfosDto credit) {
            decimal solde = 0;
            if(credit.CreditDebourse is not null) {
                solde += credit.CreditDebourse.MontantAccorde;
                solde += credit.CreditDebourse.MontantInteret;
                solde += credit.CreditDebourse.MontantCommission;
            }
            if(credit.Mouvements is not null) {
                foreach(var mvt in credit.Mouvements) {
                    if(mvt.TypeOperation == TypeOperation.Credit) {
                        solde -= mvt.Montant;
                    } 
                }
            }
            return solde;
        }

        private decimal calculMontantPayeEcheance(EcheanceCreditDto echeance){
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

        private StatusPret getStatus(CreditInfosDto credit) {
            if(credit.CreditDebourse is null) {
                return StatusPret.ENREGISTRE;
            }

            decimal montantCredit = 0; 
            montantCredit += credit.CreditDebourse.MontantAccorde;
            montantCredit += credit.CreditDebourse.MontantInteret;
            montantCredit += credit.CreditDebourse.MontantCommission;
            
            if(credit.Solde == montantCredit) {
                return StatusPret.DEBOURSE;
            }

            if(credit.Solde == 0) {
                return StatusPret.SOLDE;
            }
            return StatusPret.ENCOURS;
        }

        [HttpPost("rembourserEcheances")] 
        public async Task<IActionResult> RembourserEcheances(InfosRbCreditDto infos)
        {
            // foreach(var echeanceDto in infos.Echeancier) {
            //     var echeance = await uow.EcheanceCreditRepository.FindByIdAsync(echeanceDto.Id);
            //     if(echeance is null) {
            //         return NotFound("Cette échéances n'existe pas");
            //     }

            //     var credit = await uow.CreditRepository.FindByIdAsync(echeance.CreditId);
            //     if(credit is null) {
            //         return NotFound("Ce crédit n'existe pas dans la base de données");
            //     }

            //     var membre = await uow.MembreRepository.FindByIdAsync(credit.MembreId);
            //     if(membre is null) {
            //         return NotFound("Ce membre n'existe pas dans la base de données");
            //     }

            //     // MOUVEMENT DE REMBOURSEMENT CREDIT
            //     var mouvement = new Mouvement();
            //     mouvement.Credit = credit;
            //     mouvement.Membre = membre;
            //     mouvement.DateMvt = infos.DateMouvement;
            //     mouvement.TypeOperation = TypeOperation.Credit;
            //     mouvement.GabaritId = 1;
            //     mouvement.Libelle = "Remboursement écheance credit N° " + echeance.CreditId + " du " + echeance.DateEcheance;
            //     mouvement.Montant = echeanceDto.Montant;
            //     mouvement.ModifiePar = GetUserId();
            //     mouvement.ModifieLe = DateTime.Now;
            //     mouvement.EcheanceCredit = echeance;
            //     uow.MouvementRepository.Add(mouvement);

            //     // Calcul des intérêts à reverser 
            //     decimal montantInteret = echeanceDto.MontantPaye - echeanceDto.Capital;
            //     if(montantInteret >= 0) {
            //        montantInteret = echeanceDto.Montant;
            //     } else {
            //         montantInteret += echeanceDto.Montant;
            //     }

            //     if(montantInteret > 0) {
            //         // MOUVEMENT DE PRELEVEMENT DE L'INTERET
            //         mouvement = new Mouvement();
            //         mouvement.Credit = credit;
            //         mouvement.Membre = membre;
            //         mouvement.DateMvt = infos.DateMouvement;
            //         mouvement.TypeOperation = TypeOperation.Debit;
            //         mouvement.GabaritId = 1;
            //         mouvement.Libelle = "Prélèvement de l'intérêt sur l'échéance de credit N° " + credit.Id + " du " + echeance.DateEcheance;
            //         mouvement.Montant = montantInteret;
            //         mouvement.ModifiePar = GetUserId();
            //         mouvement.ModifieLe = DateTime.Now;
            //         mouvement.EcheanceCredit = echeance;
            //         uow.MouvementRepository.Add(mouvement);
            //     }

            // }
            // await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }


        [HttpPost("add")]
        public async Task<IActionResult> Add(CreditDto creditDto)
        {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            var credit = mapper.Map<Credit>(creditDto);

            credit.ModifiePar = GetUserId();
            credit.ModifieLe = DateTime.Now;

            uow.CreditRepository.Add(credit);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }

        [HttpPost("deboursercredit/{id}")]
        public async Task<IActionResult> DebourserCredit(int id, CreditDebourseDto creditDto)
        {
            // if(!ModelState.IsValid) 
            //     return BadRequest(ModelState);

            // var credit = await uow.CreditRepository.FindByIdAsync(id);
            // if(credit is null) {
            //     return NotFound("Cet credit n'existe pas dans la base de données");
            // }

            // var membre = await uow.MembreRepository.FindByIdAsync(credit.MembreId);
            // if(membre is null) {
            //     return NotFound("Ce membre n'existe pas dans la base de données");
            // }

            // // MOUVEMENT DE DEBOURSEMENT
            // var mouvement = new Mouvement();
            // mouvement.Credit = credit;
            // mouvement.Membre = membre;
            // mouvement.DateMvt = creditDto.DateDecaissement;
            // mouvement.TypeOperation = TypeOperation.Debit;
            // mouvement.GabaritId = 1;
            // mouvement.Libelle = "Déboursement credit N° " + id + " du " + credit.DateDemande;
            // if (creditDto.MontantAccorde != 0){
            //     mouvement.Montant = creditDto.MontantAccorde;
            // }
            // mouvement.ModifiePar = GetUserId();
            // mouvement.ModifieLe = DateTime.Now;
            // uow.MouvementRepository.Add(mouvement);
            // await uow.SaveAsync();

            // var creditDebourse = mapper.Map<CreditDebourse>(creditDto);
            // creditDebourse.Credit = credit;
            // creditDebourse.Mouvement = mouvement;
            // creditDebourse.ModifiePar = GetUserId();
            // creditDebourse.ModifieLe = DateTime.Now;
            // uow.CreditDebourseRepository.Add(creditDebourse);
            // await uow.SaveAsync();

            // MOUVEMENT DE PRELEVEMENT DE LA COMMISSION
            // mouvement = new Mouvement();
            // mouvement.Credit = credit;
            // mouvement.DateMvt = creditDto.DateDecaissement;
            // mouvement.TypeOperation = TypeOperation.Debit;
            // mouvement.GabaritId = 1;
            // mouvement.Libelle = "Prélèvement de la commission sur credit N° " + id + " du " + credit.DateDemande;
            // if (creditDto.MontantCommission != 0){
            //     mouvement.Montant = creditDto.MontantCommission;
            // }
            // mouvement.ModifiePar = GetUserId();
            // mouvement.ModifieLe = DateTime.Now;
            // uow.MouvementRepository.Add(mouvement);
            // await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }

        [HttpPost("addecheancier/{id}")]
        public async Task<IActionResult> AddEcheancier(int id, EcheanceCreditDto[] echeanceCreditsDto)
        {
            // if(!ModelState.IsValid) 
            //     return BadRequest(ModelState);

            // var credit = await uow.CreditRepository.FindByIdAsync(id);
            // if(credit is null) {
            //     return NotFound("Cet credit n'existe pas dans la base de données");
            // }

            // foreach(var echeanceDto in echeanceCreditsDto) {
            //     var echeance = mapper.Map<EcheanceCredit>(echeanceDto);
            //     if(echeanceDto.Id == 0) {
            //         echeance.Credit = credit;
            //         echeance.ModifiePar = GetUserId();
            //         echeance.ModifieLe = DateTime.Now;
            //         uow.EcheanceCreditRepository.Add(echeance);
            //         await uow.SaveAsync();
            //     }
            // }
            
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }
    }
}