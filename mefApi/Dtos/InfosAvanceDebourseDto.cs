using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class InfosAvanceDebourseDto
    {
        [Required]
        public AvanceDto Avance { get; set; } = new AvanceDto();
        [Required]
        public AvanceDebourseDto AvanceDebourse { get; set; } = new AvanceDebourseDto();
        [Required]
        public ICollection<EcheanceAvanceDto> Echeancier { get; set; }  = new List<EcheanceAvanceDto>();
    }
}