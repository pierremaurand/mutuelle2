using Microsoft.EntityFrameworkCore;
using mefApi.Interfaces;
using mefApi.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using mefApi.Dtos;

namespace mefApi.Data.Repo
{
    public class LieuAffectationRepository : ILieuAffectationRepository
    {
         public readonly DataContext dc;

        public LieuAffectationRepository(DataContext dc)
        {
            this.dc = dc;
        }



        public void Add(LieuAffectation lieuAffectation)
        {
            if(dc.LieuAffectations is not null && lieuAffectation is not null) {
                dc.LieuAffectations.Add(lieuAffectation);
            }
        }

        public void Delete(int id)
        {
            if(dc.LieuAffectations is not null) {
                var lieuaffectation = dc.LieuAffectations.Find(id);
                if(lieuaffectation is not null) {
                    dc.LieuAffectations.Remove(lieuaffectation);
                }
            }
        }

        public async Task<LieuAffectation?> FindByIdAsync(int id)
        {
            if(dc.LieuAffectations is not null) {
                var lieuaffectation = await dc.LieuAffectations
                .Where(s => s.Id == id)
                .FirstAsync();
                if(lieuaffectation is not null) {
                    return lieuaffectation;
                }
            }

            return null;
        }
        public async Task<LieuAffectation?> FindByLieuAsync(string lieu)
        {
            if(dc.LieuAffectations is not null) {
                var lieuaffectation = await dc.LieuAffectations
                .Where(s => s.Lieu == lieu)
                .FirstAsync();
                if(lieuaffectation is not null) {
                    return lieuaffectation;
                }
            }

            return null;
        }

        public async Task<IEnumerable<LieuAffectation>?> GetAllAsync()
        {
            if(dc.LieuAffectations is not null) {
                var lieuaffectations = await dc.LieuAffectations
                .ToListAsync();
                if(lieuaffectations is not null) {
                    return lieuaffectations;
                }
            }
            return null;
        }

        public async Task<bool> LieuExists(LieuAffectationDto lieu)
        {
            if(dc.LieuAffectations is not null)
                return await dc.LieuAffectations.AnyAsync(x => x.Lieu.ToLower() == lieu.Lieu.Trim().ToLower());
            return false;
        }
    }
}