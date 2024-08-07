using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IPosteRepository
    {
        Task<IEnumerable<Poste>?> GetAllAsync();
        Task<bool> PosteExists(PosteDto poste);
        void Add(Poste poste);
        void Delete(int id);
        Task<Poste?> FindByIdAsync(int id);
        Task<Poste?> FindByLibelleAsync(string libelle);
    }
}