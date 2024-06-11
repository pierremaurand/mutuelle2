using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class MouvementController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public MouvementController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
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
    }
}