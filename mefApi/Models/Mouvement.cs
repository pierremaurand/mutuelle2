using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Mouvement : BaseEntity 
    {
        [Required]
        public string? DateMvt { get; set; } 
        [Required]
        public TypeOperation? TypeOperation { get; set;}
        [Required]
        public string? Libelle { get; set; }
        [Required]
        public decimal? Montant { get; set; }

        public int? GabaritId { get; set; }
        public Gabarit? Gabarit { get; set; } 

        public int MembreId { get; set; }
        public Membre? Membre { get; set; } 

        public int? CotisationId { get; set; }
        public Cotisation? Cotisation { get; set; }

        public int? CreditId { get; set; }
        public Credit? Credit { get; set; }

        public int? AvanceId { get; set; }
        public Avance? Avance { get; set; }

        public int? DeboursementId { get; set; }
        public Deboursement? Deboursement { get; set; }

        public int? EcheanceId { get; set; }
        public Echeance? Echeance { get; set; }
    }
}