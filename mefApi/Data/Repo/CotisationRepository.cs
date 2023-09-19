using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Dtos;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class CotisationRepository : ICotisationRepository
    {
        public readonly DataContext dc;

        public CotisationRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Cotisation cotisation)
        {
            if(dc.Cotisations is not null && cotisation is not null) {
                dc.Cotisations.AddAsync(cotisation);
            }
        }

        public void Delete(int id)
        {
            if(dc.Cotisations is not null) {
                var cotisation = dc.Cotisations.Find(id);
                if(cotisation is not null) {
                    dc.Cotisations.Remove(cotisation);
                }
            }
        }

        public async Task<Cotisation?> FindByIdAsync(int id)
        {
            if(dc.Cotisations is not null) {
                var cotisation = await dc.Cotisations
                .Include(c => c.Mouvements)
                .Where(c => c.Id == id)
                .FirstAsync();
                if(cotisation is not null) {
                    return cotisation;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Cotisation>?> GetAllByMembreAsync(int membreId)
        {
            if(dc.Cotisations is not null) {
                var cotisations = await dc.Cotisations
                .Where(c => c.MembreId == membreId)
                .ToListAsync();
                if(cotisations is not null) {
                    return cotisations;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Cotisation>?> GetAllAsync()
        {
            if(dc.Cotisations is not null) {
                var cotisations = await dc.Cotisations
                .ToListAsync();
                if(cotisations is not null) {
                    return cotisations;
                }
            }

            return null;
        }

        public async Task<bool> CotisationExists(CotisationDto cotisation)
        {
            if(dc.Cotisations is not null)
                return await dc.Cotisations.AnyAsync(x => x.MoisId == cotisation.MoisId);
            return false;
        }
    }
}