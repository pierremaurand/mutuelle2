using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class DetailEcritureComptable : BaseEntity
    {
        [Required]
        public int CompteComptableId { get; set; } = 0;
        public CompteComptable? CompteComptable { get; set; }
        [Required]
        public TypeOperation TypeOperation { get; set; } = 0;
        [Required]
        public decimal Montant { get; set; } = 0;
    }
}