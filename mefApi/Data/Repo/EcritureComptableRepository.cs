using mefApi.Interfaces;
using mefApi.Models;

namespace mefApi.Data.Repo
{
    public class EcritureComptableRepository : IEcritureComptableRepository
    {
        public readonly DataContext dc;

        public EcritureComptableRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(EcritureComptable ecriturecomptable)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<EcritureComptable?> FindByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<EcritureComptable>?> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}