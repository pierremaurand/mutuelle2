using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class EcheanceCreditDto
    {
        public int Id { get; set; }
        [Required]
        public string? DateEcheance { get; set; }
        [Required]
        public decimal Capital { get; set; }
        [Required]
        public decimal Interet { get; set; }
        public decimal MontantPaye { get; set; }
        public decimal Montant { get; set; }
        public int? CreditId { get; set; }
        public ICollection<MouvementDto>? Mouvements { get; set; }
    }
}