using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class EcritureComptable : BaseEntity
    {
        [Required]
        public string Libelle { get; set; } = string.Empty;
        [Required]
        public decimal Montant { get; set; } = 0;
        [Required]
        public int MouvementId { get; set; } = 0;
        public Mouvement? Mouvement { get; set; } 
    }
}