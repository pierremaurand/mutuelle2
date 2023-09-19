using AutoMapper;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace mefApi.Controllers
{
    public class LieuAffectationController : BaseController
    {
         private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public LieuAffectationController(IMapper mapper, IUnitOfWork uow)
        {
            this.mapper = mapper;
            this.uow = uow;
        }

        [HttpGet("lieuaffectations")]
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
        public async Task<IActionResult> Add(LieuAffectationDto lieuaffectationDto)
        {
            var lieuaffectation = mapper.Map<LieuAffectation>(lieuaffectationDto);
            if(await uow.LieuAffectationRepository.LieuExists(lieuaffectationDto)) {
                lieuaffectation = await uow.LieuAffectationRepository.FindByLieuAsync(lieuaffectationDto.Lieu);
                if(lieuaffectation is null) {
                    return NotFound("Ce lieu n'existe pas dans la base");
                }
            } else {
                lieuaffectation.ModifiePar = GetUserId();
                lieuaffectation.ModifieLe = DateTime.Now;
                uow.LieuAffectationRepository.Add(lieuaffectation);
                await uow.SaveAsync();
            }
            
            return Ok(lieuaffectation.Id);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id,LieuAffectationDto lieuaffectationDto)
        {
            if(id != lieuaffectationDto.Id) 
                return BadRequest("Update not allowed");

            var lieuaffectationFromDb = await uow.LieuAffectationRepository.FindByIdAsync(id);
            
            if(lieuaffectationFromDb == null) 
                return BadRequest("Update not allowed");

            lieuaffectationFromDb.ModifiePar = GetUserId();
            lieuaffectationFromDb.ModifieLe = DateTime.Now;
            mapper.Map(lieuaffectationDto, lieuaffectationFromDb);
            await uow.SaveAsync();
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