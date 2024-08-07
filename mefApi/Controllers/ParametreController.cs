using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class ParametreController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        private readonly IHubContext<SignalrServer> signalrHub; 

        public ParametreController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("parametres")]
        public async Task<IActionResult> GetAll()
        {
            var parametres = await uow.ParametreRepository.GetAllAsync();
            if(parametres is null) {
                return NotFound();
            }
            var parametresDto = mapper.Map<IEnumerable<ParametreDto>>(parametres);
            return Ok(parametresDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var parametre = await uow.ParametreRepository.FindByIdAsync(id);
            if(parametre is null) {
                return NotFound();
            }
            var parametreDto = mapper.Map<ParametreDto>(parametre);
            return Ok(parametreDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(ParametreDto parametreDto)
        {
            var parametre = mapper.Map<Parametre>(parametreDto);
            
            parametre.ModifiePar = GetUserId();
            parametre.ModifieLe = DateTime.Now;
            uow.ParametreRepository.Add(parametre);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("ParametreAdded");
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,ParametreDto parametreDto)
        {
            if(id != parametreDto.Id) 
                return BadRequest("Update not allowed");

            var parametreFromDb = await uow.ParametreRepository.FindByIdAsync(id);
            
            if(parametreFromDb == null) 
                return BadRequest("Update not allowed");

            parametreFromDb.ModifiePar = GetUserId();
            parametreFromDb.ModifieLe = DateTime.Now;
            mapper.Map(parametreDto, parametreFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("ParametreAdded");
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteParametre(int id)
        {
            uow.ParametreRepository.Delete(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}