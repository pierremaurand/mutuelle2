using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Interfaces;
using mefApi.Models;
using Microsoft.EntityFrameworkCore;

namespace mefApi.Data.Repo
{
    public class OperationRepository : IOperationRepository
    {
        public readonly DataContext dc;

        public OperationRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void Add(Operation operation)
        {
            if(dc.Operations is not null && operation is not null) {
                dc.Operations.Add(operation);
            }
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Operation?> FindByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Operation>?> GetGabaritOperations(int id)
        {
            if(dc.Operations is not null) {
                var operations = await dc.Operations
                .Where(o => o.GabaritId == id)
                .ToListAsync();
                if(operations is not null) {
                    return operations;
                }
            }

            return null;
        }
    }
}