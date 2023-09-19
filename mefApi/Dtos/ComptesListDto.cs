using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class ComptesListDto
    {
        public MembreListDto Membre { get; set; } = new MembreListDto();
    }
}