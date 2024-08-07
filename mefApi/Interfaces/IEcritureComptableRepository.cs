using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IEcritureComptableRepository
    {
        Task<IEnumerable<EcritureComptable>?> GetAllAsync();
        void Add(EcritureComptable ecriturecomptable);
        void Delete(int id);
        Task<EcritureComptable?> FindByIdAsync(int id);
    }
}