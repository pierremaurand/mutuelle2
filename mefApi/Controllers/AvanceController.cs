using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
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
        public async Task<IActionResult> GetAll()
        {
            var avances = await uow.AvanceRepository.GetAllAsync();
            var avancesDto = mapper.Map<List<AvanceDto>>(avances);
            
            return Ok(avancesDto);
        }

        [HttpPost("debours")]
        public async Task<IActionResult> Debours(MouvementDto mouvementDto)
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

        [HttpPost("validate/{id}")]
        public async Task<IActionResult> Validate(int id, DeboursementDto deboursementDto)
        {
            var avance = await uow.AvanceRepository.FindByIdAsync(id);
            if(avance is null) {
                return NotFound("Cette avance n'existe pas");
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
    }
}