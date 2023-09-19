using System.Collections.Generic;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ICompteComptableRepository
    {
        Task<IEnumerable<CompteComptable>?> GetAllAsync();
        void Add(CompteComptable comptecomptable);
        void Delete(int id);
        Task<CompteComptable?> FindByIdAsync(int id);
    }
}