using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Dtos
{
    public class InfosRemboursementsDto
    {
        public string DateMouvement { get; set; } = string.Empty;
        public ICollection<EcheanceAvanceDto> Echeancier { get; set; } = new List<EcheanceAvanceDto>();
    }
}