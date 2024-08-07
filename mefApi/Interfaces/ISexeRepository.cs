using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ISexeRepository
    {
        Task<IEnumerable<Sexe>?> GetAllAsync();
        Task<bool> SexeExists(SexeDto sexe);
        void Add(Sexe sexe);
        void Delete(int id);
        Task<Sexe?> FindByIdAsync(int id);
        Task<Sexe?> FindByNomAsync(string nom);
    }
}