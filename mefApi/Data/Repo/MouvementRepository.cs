using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class MouvementRepository : IMouvementRepository
    {
        public readonly DataContext dc;

        public MouvementRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Mouvement mouvement)
        {
            if(dc.Mouvements is not null && mouvement is not null) {
                dc.Mouvements.AddAsync(mouvement);
            }
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Mouvement?> FindByIdAsync(int? id)
        {
            if(dc.Mouvements is not null) {
                var mouvement = await dc.Mouvements
                .Where(m => m.Id == id)
                .FirstOrDefaultAsync();
                if(mouvement is not null) {
                    return mouvement;
                }
            }

            return null;
        }

        public async Task<Mouvement?> FindByEcheanceAvanceIdAsync(int? id) {
            if(dc.Mouvements is not null) {
                var mouvement = await dc.Mouvements
                .Where(m => m.Id == id )
                .FirstOrDefaultAsync();
                if(mouvement is not null) {
                    return mouvement;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Mouvement>?> GetAllAsync()
        {
            if(dc.Mouvements is not null) {
                var mouvements = await dc.Mouvements
                .ToListAsync();
                if(mouvements is not null) {
                    return mouvements;
                }
            }

            return null;
        }
    }
}