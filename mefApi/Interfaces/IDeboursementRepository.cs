using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IDeboursementRepository
    {
        Task<IEnumerable<Deboursement>?> GetAllAsync();
        void Add(Deboursement deboursement);
        void Delete(int id);
        Task<Deboursement?> FindByIdAsync(int id);
    }
}