using System.Collections.Generic;
using System.Threading.Tasks;
using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IMembreRepository
    {
        Task<IEnumerable<Membre>?> GetAllAsync();
        Task<IEnumerable<Membre>?> GetByEtatAsync(bool estActif);
        Task<bool> MembreExists(MembreDto membre);
        void Add(Membre membre);
        void Delete(int id);
        Task<Membre?> FindByIdAsync(int id);
        Task<Membre?> FindByInfosAsync(MembreDto membre);
    }
}