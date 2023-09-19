using System.Collections.Generic;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ICreditRepository
    {
        Task<IEnumerable<Credit>?> GetAllAsync();
        void Add(Credit credit);
        void Delete(int id);
        Task<Credit?> FindByIdAsync(int id);
    }
}