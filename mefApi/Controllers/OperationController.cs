using AutoMapper;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace mefApi.Controllers
{
    public class OperationController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public OperationController(IMapper mapper, IUnitOfWork uow)
        {
            this.mapper = mapper;
            this.uow = uow;
        }

        [HttpGet("operations")]
        public async Task<IActionResult> GetAll() {
            var operations = await uow.OperationRepository.GetAllAsync();
            var operationsDto = mapper.Map<IEnumerable<OperationDto>>(operations);
            return Ok(operationsDto);
        }
    }
}