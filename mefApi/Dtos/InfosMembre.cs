using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class InfosMembre
    {
        public int Id { get; set; }
        public MembreDto? Membre { get; set; }
    }
}