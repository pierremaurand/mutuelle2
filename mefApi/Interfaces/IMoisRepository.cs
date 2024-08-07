using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IMoisRepository
    {
        Task<IEnumerable<Mois>?> GetAllAsync();
        Task<Mois?> FindAsync(int id);
    }
}