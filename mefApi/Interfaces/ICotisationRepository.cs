using mefApi.Dtos;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ICotisationRepository
    {
        Task<IEnumerable<Cotisation>?> GetAllByMembreAsync(int membreId);
        Task<IEnumerable<Cotisation>?> GetAllAsync();
        Task<bool> CotisationExists(CotisationDto cotisation);
        void Add(Cotisation cotisation);
        void Delete(int id);
        Task<Cotisation?> FindByIdAsync(int id);
    }
}