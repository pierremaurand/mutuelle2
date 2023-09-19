using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class AvanceListDto
    {
        public int Id { get; set; } = 0;
        public MembreDto Membre { get; set; } = new MembreDto();
        public decimal Solde { get; set; } = 0;
        public string Status { get; set; } = string.Empty;
    }
}