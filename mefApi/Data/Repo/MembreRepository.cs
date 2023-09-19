using Microsoft.EntityFrameworkCore;
using mefApi.Interfaces;
using mefApi.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using mefApi.Dtos;

namespace mefApi.Data.Repo
{
    public class MembreRepository : IMembreRepository
    {
        public readonly DataContext dc;

        public MembreRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Membre membre)
        {
            if(dc.Membres is not null && membre is not null) {
                dc.Membres.AddAsync(membre);
            }
        }

        public void Delete(int id)
        {
            if(dc.Membres is not null) {
                var membre = dc.Membres.Find(id);
                if(membre is not null) {
                    dc.Membres.Remove(membre);
                }
            }
        }

        public async Task<Membre?> FindByIdAsync(int id)
        {
            if(dc.Membres is not null) {
                var membre = await dc.Membres
                .Where(m => m.Id == id)
                .FirstOrDefaultAsync();
                if(membre is not null) {
                    return membre;
                }
            }

            return null;
        }
        public async Task<Membre?> FindByInfosAsync(MembreDto mbre)
        {
            if(dc.Membres is not null && mbre is not null) {
                var membre = await dc.Membres
                .Where(m => m.Nom == mbre.Nom && m.DateNaissance == mbre.DateNaissance && m.DateAdhesion == mbre.DateAdhesion)
                .FirstOrDefaultAsync();
                if(membre is not null) {
                    return membre;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Membre>?> GetAllAsync()
        {
            if(dc.Membres is not null) {
                var membres = await dc.Membres
                .ToListAsync();

                if(membres is not null){
                    return membres;
                }
            }
            
           return null;
        }

        public async Task<IEnumerable<Membre>?> GetByEtatAsync(bool estActif)
        {
            if(dc.Membres is not null) {
                var membres = await dc.Membres
                .Include(m => m.Mouvements)
                .Include(m => m.Cotisations)
                .Include(m => m.Avances)
                .Include(m => m.Credits)
                .Where(m => m.EstActif == estActif)
                .ToListAsync();
                if(membres is not null) {
                    return membres;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Membre>?> GetByPosteAsync(int posteId)
        {
            if(dc.Membres is not null) {
                var membres = await dc.Membres
                .Include(m => m.Mouvements)
                .Include(m => m.Cotisations)
                .Include(m => m.Avances)
                .Include(m => m.Credits)
                .Where(s => s.PosteId == posteId)
                .ToListAsync();
                if(membres is not null) {
                    return membres;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Membre>?> GetBySexeAsync(int sexeId)
        {
            if(dc.Membres is not null) {
                var membres = await dc.Membres
                .Include(m => m.Mouvements)
                .Include(m => m.Cotisations)
                .Include(m => m.Avances)
                .Include(m => m.Credits)
                .Where(m => m.SexeId == sexeId)
                .ToListAsync();
                if(membres is not null) {
                    return membres;
                }
            }

            return null;
        }

        public async Task<bool> MembreExists(MembreDto membre)
        {
            if(dc.Membres is not null)
                return await dc.Membres.AnyAsync(x => x.Nom == membre.Nom && x.DateNaissance == membre.DateNaissance && x.DateAdhesion == membre.DateAdhesion);
            return false;
        }
    }
}