using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ILieuAffectationRepository
    {
        Task<IEnumerable<LieuAffectation>?> GetAllAsync();
        Task<bool> LieuExists(LieuAffectationDto lieu);
        void Add(LieuAffectation lieuaffectation);
        void Delete(int id);
        Task<LieuAffectation?> FindByIdAsync(int id);
        Task<LieuAffectation?> FindByLieuAsync(string lieu);
    }
}