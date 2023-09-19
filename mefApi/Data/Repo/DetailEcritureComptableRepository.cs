using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using mefApi.Interfaces;
using mefApi.Models;

namespace mefApi.Data.Repo
{
    public class DetailEcritureComptableRepository : IDetailEcritureComptableRepository
    {
        public readonly DataContext dc;

        public DetailEcritureComptableRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(DetailEcritureComptable detailecriturecomptable)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<DetailEcritureComptable?> FindByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DetailEcritureComptable>?> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}