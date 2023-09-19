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
    public class DeboursementController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public DeboursementController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAll()
        {
            var deboursements = await uow.DeboursementRepository.GetAllAsync();
            var deboursementsDto = mapper.Map<List<DeboursementDto>>(deboursements);
            
            return Ok(deboursementsDto);
        }

        [HttpPost("deboursementavance/{id}")]
        public async Task<IActionResult> DeboursementAvance(int id,DeboursementDto deboursementDto)
        {
            var avance = await uow.AvanceRepository.FindByIdAsync(id);
            
            if(avance is null) {
                return BadRequest("L'avance n'existe pas");
            }

            if(avance.DeboursementId is not null) {
                return BadRequest("Cet avance a déjà été déboursé");
            }

            var deboursement = mapper.Map<Deboursement>(deboursementDto);

            deboursement.ModifiePar = GetUserId();
            deboursement.ModifieLe = DateTime.Now;
            deboursement.Avance = avance;
            uow.DeboursementRepository.Add(deboursement);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("DeboursementAdded");
            await signalrHub.Clients.All.SendAsync("AvanceAdded");
            return StatusCode(201);
        }

        [HttpPost("deboursementcredit/{id}")]
        public async Task<IActionResult> DeboursementCredit(int id,DeboursementDto deboursementDto)
        {
            var credit = await uow.CreditRepository.FindByIdAsync(id);
            
            if(credit is null) {
                return BadRequest("Le crédit n'existe pas");
            }

            if(credit.DeboursementId is not null) {
                return BadRequest("Cet crédit a déjà été déboursé");
            }

            var deboursement = mapper.Map<Deboursement>(deboursementDto);

            deboursement.ModifiePar = GetUserId();
            deboursement.ModifieLe = DateTime.Now;
            deboursement.Credit = credit;
            uow.DeboursementRepository.Add(deboursement);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("DeboursementAdded");
            return StatusCode(201);
        }
    }
}