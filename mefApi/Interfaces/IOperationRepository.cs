using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IOperationRepository
    {
        Task<IEnumerable<Operation>?> GetAllAsync();
        void Add(Operation operation);
        void Delete(int id);
        Task<Operation?> FindByIdAsync(int id);
    }
}