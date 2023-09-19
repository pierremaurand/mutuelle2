using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class CreditDebourseDto
    {
        public int Id { get; set; } = 0;
        [Required]
        public decimal MontantAccorde { get; set; } = 0;
        [Required]
        public decimal MontantCommission { get; set; } = 0;
        [Required]
        public decimal MontantInteret { get; set; } = 0;
        [Required]
        public int DureeAccordee { get; set; } = 0;
        [Required]
        public string DateDecaissement { get; set; } = string.Empty;
        public MouvementDto? Mouvement { get; set; }
        public ICollection<EcheanceCreditDto>? Echeancier { get; set; } 
    }
}