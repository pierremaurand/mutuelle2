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

        [HttpPost("add")]
        public async Task<IActionResult> Add(DeboursementDto deboursementDto)
        {
            var deboursement = mapper.Map<Deboursement>(deboursementDto);

            deboursement.ModifiePar = GetUserId();
            deboursement.ModifieLe = DateTime.Now;
            uow.DeboursementRepository.Add(deboursement);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("DeboursementAdded");
            await signalrHub.Clients.All.SendAsync("AvanceAdded");
            await signalrHub.Clients.All.SendAsync("CreditAdded");
            return StatusCode(201);
        }

        
    }
}