using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IMouvementRepository
    {
        Task<IEnumerable<Mouvement>?> GetAllAsync();
        void Add(Mouvement mouvement);
        void Delete(int id);
        Task<Mouvement?> FindByIdAsync(int? id);
        Task<Mouvement?> FindByEcheanceAvanceIdAsync(int? id);
    }
}