using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Models
{
    public class Deboursement : BaseEntity
    {
        [Required]
        public decimal MontantAccorde { get; set; } 
        public decimal? MontantCommission { get; set; } 
        public decimal? MontantInteret { get; set; } 
        [Required]
        public int DureeAccordee { get; set; }
        [Required]
        public string DateDecaissement { get; set; } = string.Empty;
        public Mouvement? Mouvement { get; set; }
        [Required]
        public int MembreId { get; set; }
        public Membre? Membre { get; set; }
        public Credit? Credit { get; set; }
        public Avance? Avance { get; set; }
    }
}