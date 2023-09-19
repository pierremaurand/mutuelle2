using System.Collections.Generic;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IDetailEcritureComptableRepository
    {
        Task<IEnumerable<DetailEcritureComptable>?> GetAllAsync();
        void Add(DetailEcritureComptable detailecriturecomptable);
        void Delete(int id);
        Task<DetailEcritureComptable?> FindByIdAsync(int id);
    }
}