using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class DonneesMembreDto
    {
        public MembreDto? Membre { get; set; }
        public PhotoMembreDto? Photo { get; set; }
    }
}