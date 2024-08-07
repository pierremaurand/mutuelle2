using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class PosteController: BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        private readonly IHubContext<SignalrServer> signalrHub; 

        public PosteController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("postes")]
        public async Task<IActionResult> GetAll()
        {
            var postes = await uow.PosteRepository.GetAllAsync();
            if(postes is null) {
                return NotFound();
            }
            var postesDto = mapper.Map<IEnumerable<PosteDto>>(postes);
            return Ok(postesDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var poste = await uow.PosteRepository.FindByIdAsync(id);
            if(poste is null) {
                return NotFound();
            }
            var posteDto = mapper.Map<PosteDto>(poste);
            return Ok(posteDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(PosteDto posteDto)
        {
            var poste = mapper.Map<Poste>(posteDto);
            var posteExist = await uow.PosteRepository.PosteExists(posteDto);

            if(posteExist) {
                return BadRequest("Ce poste existe déjà dans la base de données");
            }

            poste.ModifiePar = GetUserId();
            poste.ModifieLe = DateTime.Now;
            uow.PosteRepository.Add(poste);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("PosteAdded");
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,PosteDto posteDto)
        {
            if(id != posteDto.Id) 
                return BadRequest("Update not allowed");

            var posteFromDb = await uow.PosteRepository.FindByIdAsync(id);
            
            if(posteFromDb == null) 
                return BadRequest("Update not allowed");

            posteFromDb.ModifiePar = GetUserId();
            posteFromDb.ModifieLe = DateTime.Now;
            mapper.Map(posteDto, posteFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("PosteAdded");
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePoste(int id)
        {
            uow.PosteRepository.Delete(id);
            await uow.SaveAsync();
            return Ok(id);
        }

    }
}