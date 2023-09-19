using System.Collections.Generic;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IAvanceRepository
    {
        Task<IEnumerable<Avance>?> GetAllAsync();
        void Add(Avance avance);
        void Delete(int id);
        Task<Avance?> FindByIdAsync(int id);
    }
}