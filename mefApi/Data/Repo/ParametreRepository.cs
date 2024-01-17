using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class ParametreRepository : IParametreRepository
    {
         public readonly DataContext dc;

        public ParametreRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Parametre parametre)
        {
            if(dc.Parametres is not null && parametre is not null) {
                dc.Parametres.Add(parametre);
            }
        }

        public void Delete(int id)
        {
            if(dc.Parametres is not null) {
                var parametre = dc.Parametres.Find(id);
                if(parametre is not null) {
                    dc.Parametres.Remove(parametre);
                }
            }
        }

        public async Task<Parametre?> FindByIdAsync(int id)
        {
             if(dc.Parametres is not null) {
                var parametre = await dc.Parametres
                .Where(p => p.Id == id)
                .FirstAsync();
                if(parametre is not null) {
                    return parametre;
                }
            }

            return null;
        }

        public async Task<IEnumerable<Parametre>?> GetAllAsync()
        {
            if(dc.Parametres is not null) {
                var parametres = await dc.Parametres
                .ToListAsync();
                if(parametres is not null) {
                    return parametres;
                }
            }
            return null;
        }
    }
}