using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Interfaces
{
    public interface IMouvementRepository
    {
        Task<IEnumerable<Mouvement>?> GetAllAsync();
        void Add(Mouvement mouvement);
        void Delete(int id);
        Task<Mouvement?> FindByIdAsync(int? id);
        Task<Mouvement?> FindByEcheanceAvanceIdAsync(int? id);
    }
}