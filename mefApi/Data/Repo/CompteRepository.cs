using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Interfaces;
using mefApi.Models;

namespace mefApi.Data.Repo
{
    public class CompteRepository : ICompteRepository
    {
        public readonly DataContext dc;

        public CompteRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public Task<Compte?> FindByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Compte>?> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}