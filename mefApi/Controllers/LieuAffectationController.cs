using AutoMapper;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using mefApi.HubConfig;
using Microsoft.AspNetCore.SignalR;

namespace mefApi.Controllers
{
    public class LieuAffectationController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IHubContext<SignalrServer> signalrHub; 

        public LieuAffectationController(IMapper mapper, IUnitOfWork uow, IHubContext<SignalrServer> signalrHub)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.signalrHub = signalrHub;
        }

        [HttpGet("lieuxAffectations")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var lieuaffectations = await uow.LieuAffectationRepository.GetAllAsync();
            if(lieuaffectations is null) {
                return NotFound();
            }
            var lieuaffectationsDto = mapper.Map<IEnumerable<LieuAffectationDto>>(lieuaffectations);
            return Ok(lieuaffectationsDto);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var lieuaffectation = await uow.LieuAffectationRepository.FindByIdAsync(id);
            if(lieuaffectation is null) {
                return NotFound();
            }
            var lieuaffectationDto = mapper.Map<LieuAffectationDto>(lieuaffectation);
            return Ok(lieuaffectationDto);
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> Add(LieuAffectationDto lieuAffectationDto)
        {
            var lieuAffectation = mapper.Map<LieuAffectation>(lieuAffectationDto);
            var lieuAffectationExist = await uow.LieuAffectationRepository.LieuExists(lieuAffectationDto);

            if(lieuAffectationExist){
                return BadRequest("Ce lieu d'affectation existe déjà dans la base");
            }
            
            lieuAffectation.ModifiePar = GetUserId();
            lieuAffectation.ModifieLe = DateTime.Now;
            uow.LieuAffectationRepository.Add(lieuAffectation);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("LieuAffectationAdded");
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,LieuAffectationDto lieuAffectationDto)
        {
            if(id != lieuAffectationDto.Id) 
                return BadRequest("Update not allowed");

            var lieuAffectationFromDb = await uow.LieuAffectationRepository.FindByIdAsync(id);
            
            if(lieuAffectationFromDb == null) 
                return BadRequest("Update not allowed");

            lieuAffectationFromDb.ModifiePar = GetUserId();
            lieuAffectationFromDb.ModifieLe = DateTime.Now;
            mapper.Map(lieuAffectationDto, lieuAffectationFromDb);
            await uow.SaveAsync();
            await signalrHub.Clients.All.SendAsync("LieuAffectationAdded");
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCompte(int id)
        {
            uow.LieuAffectationRepository.Delete(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}