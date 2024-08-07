using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IGabaritRepository
    {
        Task<IEnumerable<Gabarit>?> GetAllAsync();
        Task<IEnumerable<Gabarit>?> GetAllActiveAsync();
        void Add(Gabarit gabarit);
        void Delete(int id);
        Task<Gabarit?> FindByIdAsync(int id);
    }
}