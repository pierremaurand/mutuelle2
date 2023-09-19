using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IEcheanceRepository
    {
        Task<IEnumerable<Echeance>?> GetAllAsync();
        void Add(Echeance echeance);
        void Delete(int id);
        Task<Echeance?> FindByIdAsync(int id);
    }
}