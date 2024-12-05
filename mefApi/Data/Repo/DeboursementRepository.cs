using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class DeboursementRepository : IDeboursementRepository
    {
        public readonly DataContext dc;

        public DeboursementRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<Deboursement>?> GetAllAsync() {
            if(dc.Deboursements is not null) {
                var deboursements = await dc.Deboursements
                .ToListAsync();
                if(deboursements is not null) {
                    return deboursements;
                }
            }

            return null;
        }

        public void Add(Deboursement deboursement) {
            if(dc.Deboursements is not null && deboursement is not null) {
                dc.Deboursements.AddAsync(deboursement);
            }
        }

        public void Delete(int id) {
            throw new NotImplementedException();
        }

        public async Task<Deboursement?> FindByIdAsync(int id) {
            if(dc.Deboursements is not null) {
                var deboursement = await dc.Deboursements
                .Where(d => d.Id == id)
                .FirstAsync();
                if(deboursement is not null) {
                    return deboursement;
                }
            }

            return null;
        }
    }
}