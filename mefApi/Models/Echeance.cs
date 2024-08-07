using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Echeance : BaseEntity
    {  
        [Required]
        public string DateEcheance { get; set; } = string.Empty;
        [Required]
        public decimal MontantEcheance { get; set; } 
        public decimal? Capital { get; set; }
        public decimal? Interet { get; set; }
        public ICollection<Mouvement>? Mouvements { get; set; }
        public int MembreId { get; set; }
        public Membre? Membre { get; set; }
        public int? AvanceId { get; set; }
        public Avance? Avance { get; set; }
        public int? CreditId { get; set; }
        public Credit? Credit { get; set; }
    }
}