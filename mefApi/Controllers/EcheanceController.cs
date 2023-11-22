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
    public class EcheanceController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public EcheanceController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAll()
        {
            var echeances = await uow.EcheanceRepository.GetAllAsync();
            var echeancesDto = mapper.Map<List<EcheanceDto>>(echeances);
            
            return Ok(echeancesDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddEcheances(EcheanceDto[] echeancesDto)
        {
            var echeances = mapper.Map<List<Echeance>>(echeancesDto);
            foreach(var echeance in echeances) {
                echeance.ModifiePar = GetUserId();
                echeance.ModifieLe = DateTime.Now;
                uow.EcheanceRepository.Add(echeance);
            }
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("EcheanceAdded");
            return StatusCode(201);
        }

        [HttpPost("addPayement")]
        public async Task<IActionResult> AddPayement(MouvementDto mouvementDto)
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
            await signalrHub.Clients.All.SendAsync("EcheanceAdded");
            return StatusCode(201);
        }

    }
}