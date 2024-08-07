using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IUtilisateurRepository
    {
        Task<Utilisateur?> Authenticate(string login);
        void Add(Utilisateur utilisateur);
        Task<bool> UtilisateurExists(UtilisateurDto user);
        Task<IEnumerable<Utilisateur>?> GetAllAsync();
        Task<Utilisateur?> FindByIdAsync(int id);
        Task<Utilisateur?> FindByIdAsync(string userName);
    }
}