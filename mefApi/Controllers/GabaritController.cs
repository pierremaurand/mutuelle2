using AutoMapper;
using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class GabaritController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 
        public GabaritController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("gabarits")]
        public async Task<IActionResult> GetAll()
        {
            var gabarits = await uow.GabaritRepository.GetAllAsync();
            if(gabarits is null) {
                return NotFound("Aucun gabarit n'a été trouvé dans la bdd");
            }
            var gabaritsDto = mapper.Map<List<GabaritDto>>(gabarits);
            return Ok(gabaritsDto);
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetAllActive()
        {
            var gabarits = await uow.GabaritRepository.GetAllActiveAsync();
            if(gabarits is null) {
                return NotFound();
            }
            var gabaritsDto = mapper.Map<IEnumerable<GabaritDto>>(gabarits);
            return Ok(gabaritsDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var gabarit = await uow.GabaritRepository.FindByIdAsync(id);
            if(gabarit is null) {
                return NotFound();
            }
            var gabaritDto = mapper.Map<GabaritDto>(gabarit);
            return Ok(gabaritDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(GabaritDto gabaritDto)
        {
            var gabarit = mapper.Map<Gabarit>(gabaritDto);
            
            gabarit.ModifiePar = GetUserId();
            gabarit.ModifieLe = DateTime.Now;
            uow.GabaritRepository.Add(gabarit);

            var operations = mapper.Map<IEnumerable<Operation>>(gabaritDto.Operations);
            foreach(var operation in operations) {
                operation.Gabarit = gabarit; 
                operation.ModifiePar = GetUserId();
                operation.ModifieLe = DateTime.Now;
                uow.OperationRepository.Add(operation);
            }
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("GabaritAdded");
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,GabaritDto gabaritDto)
        {
            if(id != gabaritDto.Id) 
                return BadRequest("Update not allowed");

            var gabaritFromDb = await uow.GabaritRepository.FindByIdAsync(id);
            
            if(gabaritFromDb == null) 
                return BadRequest("Update not allowed");

            gabaritFromDb.ModifieLe = DateTime.Now;
            mapper.Map(gabaritDto, gabaritFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("GabaritAdded");
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCompte(int id)
        {
            uow.GabaritRepository.Delete(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}