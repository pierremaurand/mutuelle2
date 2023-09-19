using AutoMapper;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using mefApi.HubConfig;

namespace mefApi.Controllers
{
    public class CompteController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public CompteController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("mouvements")] 
        [AllowAnonymous]
        public async Task<IActionResult> GetAll() {
            var mouvements = await uow.MouvementRepository.GetAllAsync();
            if(mouvements is null) {
                return NotFound("Aucun mouvements trouvé dans la bdd");
            }

            var mouvementsDto = mapper.Map<List<MouvementDto>>(mouvements);
            return Ok(mouvementsDto);
        }


        [HttpPost("addmouvement")]
        [AllowAnonymous]
        public async Task<IActionResult> AddMouvement(MouvementDto mouvementDto)
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
            return StatusCode(201);
        }

    }
}