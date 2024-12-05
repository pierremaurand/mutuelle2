using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class EcheanceRepository : IEcheanceRepository
    {
        public readonly DataContext dc;

        public EcheanceRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<Echeance>?> GetAllAsync() {
            if(dc.Echeances is not null) {
                var echeances = await dc.Echeances
                .ToListAsync();
                if(echeances is not null) {
                    return echeances;
                }
            }

            return null;
        }

        public void Add(Echeance echeance) {
            if(dc.Echeances is not null && echeance is not null) {
                dc.Echeances.AddAsync(echeance);
            }
        }

        public void Delete(int id) {

        }

        public async Task<Echeance?> FindByIdAsync(int id) {
            if(dc.Echeances is not null) {
                var echeance = await dc.Echeances
                .Where(e => e.Id == id)
                .FirstAsync();
                if(echeance is not null) {
                    return echeance;
                }
            }

            return null;
        }
    }
}