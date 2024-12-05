using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class AvanceRepository : IAvanceRepository
    {
        public readonly DataContext dc;

        public AvanceRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Avance avance)
        {
            if(dc.Avances is not null && avance is not null) {
                dc.Avances.AddAsync(avance);
            }
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Avance?> FindByIdAsync(int id)
        {
            if(dc.Avances is not null) {
                var avance = await dc.Avances
                .Include(a => a.Membre)
                .Include(a => a.Deboursement)
                .Where(a => a.Id == id)
                .FirstOrDefaultAsync();
                if(avance is not null) {
                    return avance;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Avance>?> GetAllAsync()
        {
            if(dc.Avances is not null) {
                var avances = await dc.Avances
                .Include(a => a.Membre)
                .Include(a => a.Deboursement)
                .ToListAsync();
                if(avances is not null) {
                    return avances;
                }
            }

            return null;
        }
    }
}