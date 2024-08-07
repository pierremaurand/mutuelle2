using mefApi.Dtos;
using mefApi.HubConfig;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class CompteComptableController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        private readonly IHubContext<SignalrServer> signalrHub; 

        public CompteComptableController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("comptes")]
        public async Task<IActionResult> GetAll()
        {
            var comptes = await uow.CompteComptableRepository.GetAllAsync();
            if(comptes is null) {
                return NotFound();
            }
            var comptesDto = mapper.Map<IEnumerable<CompteComptableDto>>(comptes);
            return Ok(comptesDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var compte = await uow.CompteComptableRepository.FindByIdAsync(id);
            if(compte is null) {
                return NotFound();
            }
            var compteDto = mapper.Map<CompteComptableDto>(compte);
            return Ok(compteDto);
        }

        [HttpPost("addcompte")]
        public async Task<IActionResult> Add(CompteComptableDto compteDto)
        {
            var compte = mapper.Map<CompteComptable>(compteDto);
            var compteExist = await uow.CompteComptableRepository.CompteExists(compteDto);

            if(compteExist) {
                return BadRequest("Ce compte compteble existe déjà dans la base de données");
            }

            compte.ModifiePar = GetUserId();
            compte.ModifieLe = DateTime.Now;
            uow.CompteComptableRepository.Add(compte);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("CompteComptableAdded");
            return StatusCode(201);
        }

        [HttpPost("addcomptes")]
        [AllowAnonymous]
        public async Task<IActionResult> Add(IEnumerable<CompteComptableDto> comptesDto)
        {
            var comptes = mapper.Map<IEnumerable<CompteComptable>>(comptesDto);
            foreach(var compte in comptes) {
                
                compte.ModifiePar = GetUserId();
                compte.ModifieLe = DateTime.Now;
                uow.CompteComptableRepository.Add(compte);
            }
            
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,CompteComptableDto compteDto)
        {
            if(id != compteDto.Id) 
                return BadRequest("Update not allowed");

            var compteFromDb = await uow.CompteComptableRepository.FindByIdAsync(id);
            
            if(compteFromDb == null) 
                return BadRequest("Update not allowed");

            compteFromDb.ModifiePar = GetUserId();
            compteFromDb.ModifieLe = DateTime.Now;
            mapper.Map(compteDto, compteFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("CompteComptableAdded");
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCompte(int id)
        {
            uow.CompteComptableRepository.Delete(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}