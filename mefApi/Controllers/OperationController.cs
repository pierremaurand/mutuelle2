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

        [HttpPost("add/{id}")]
        public async Task<IActionResult> AddOperations(int id, OperationDto[] operationsDto)
        {
            var operations = mapper.Map<IEnumerable<Operation>>(operationsDto);
            foreach(var operation in operations) {
                operation.GabaritId = id; 
                operation.ModifiePar = GetUserId();
                operation.ModifieLe = DateTime.Now;
                uow.OperationRepository.Add(operation);
            }
            
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpGet("operations/{id}")]
        public async Task<IActionResult> GetGabaritOperations(int id) {
            var operations = await uow.OperationRepository.GetGabaritOperations(id);
            var operationsDto = mapper.Map<IEnumerable<OperationDto>>(operations);
            return Ok(operationsDto);
        }
    }
}