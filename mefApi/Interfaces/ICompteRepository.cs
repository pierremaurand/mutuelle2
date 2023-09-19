using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface ICompteRepository
    {
        Task<IEnumerable<Compte>?> GetAllAsync();
        Task<Compte?> FindByIdAsync(int id);
    }
}