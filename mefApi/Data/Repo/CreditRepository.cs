using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class CreditRepository : ICreditRepository
    {
        public readonly DataContext dc;

        public CreditRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Credit credit)
        {
            if(dc.Credits is not null && credit is not null) {
                dc.Credits.AddAsync(credit);
            }
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Credit?> FindByIdAsync(int id)
        {
            if(dc.Credits is not null) {
                var credit = await dc.Credits
                .Include(c => c.Membre)
                .Include(c => c.Deboursement)
                .Where(s => s.Id == id)
                .FirstAsync();
                if(credit is not null) {
                    return credit;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Credit>?> GetAllAsync()
        {
            if(dc.Credits is not null) {
                var credits = await dc.Credits
                .Include(c => c.Membre)
                .Include(c => c.Deboursement)
                .ToListAsync();
                if(credits is not null) {
                    return credits;
                }
            }

            return null;
        }
    }
}