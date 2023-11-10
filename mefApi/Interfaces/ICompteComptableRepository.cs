using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ICompteComptableRepository
    {
        Task<IEnumerable<CompteComptable>?> GetAllAsync();
        Task<bool> CompteExists(CompteComptableDto compte);
        void Add(CompteComptable comptecomptable);
        void Delete(int id);
        Task<CompteComptable?> FindByIdAsync(int id);
    }
}