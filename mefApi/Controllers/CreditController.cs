using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using mefApi.HubConfig;
using AutoMapper;

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
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var credits = await uow.CreditRepository.GetAllAsync();
            var creditsDto = mapper.Map<List<CreditDto>>(credits);
            
            return Ok(creditsDto);
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

        [HttpPost("validate/{id}")]
        public async Task<IActionResult> Validate(int id, DeboursementDto deboursementDto)
        {
            var credit = await uow.CreditRepository.FindByIdAsync(id);
            if(credit is null) {
                return NotFound("Le crédit n'existe pas");
            } 

            var deboursement = mapper.Map<Deboursement>(deboursementDto);

            deboursement.ModifiePar = GetUserId();
            deboursement.ModifieLe = DateTime.Now;
            deboursement.Credit = credit;
            uow.DeboursementRepository.Add(deboursement);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("DeboursementAdded");
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }

        [HttpPost("debours")]
        [AllowAnonymous]
        public async Task<IActionResult> Debours(MouvementDto[] mouvementsDto)
        {
            var mouvements = mapper.Map<List<Mouvement>>(mouvementsDto);
            
            foreach(var mouvement in mouvements) {
                mouvement.ModifiePar = GetUserId();
                mouvement.ModifieLe = DateTime.Now;
                if(mouvement.Id == 0)
                    uow.MouvementRepository.Add(mouvement);
            }
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("MouvementAdded");
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }
    }
}