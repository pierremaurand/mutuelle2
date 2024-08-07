using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IParametreRepository
    {
        Task<IEnumerable<Parametre>?> GetAllAsync();
        void Add(Parametre parametre);
        void Delete(int id);
        Task<Parametre?> FindByIdAsync(int id);
    }
}