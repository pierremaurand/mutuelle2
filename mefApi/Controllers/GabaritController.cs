using AutoMapper;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace mefApi.Controllers
{
    public class GabaritController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public GabaritController(IMapper mapper, IUnitOfWork uow)
        {
            this.mapper = mapper;
            this.uow = uow;
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
            await uow.SaveAsync();
            return Ok(gabarit.Id);
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