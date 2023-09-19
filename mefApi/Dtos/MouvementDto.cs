using System.ComponentModel.DataAnnotations;
using mefApi.Models;

namespace mefApi.Dtos
{
    public class MouvementDto
    {
        public int Id { get; set; } 
        [Required]
        public string? DateMvt { get; set; } 
        [Required]
        public TypeOperation TypeOperation { get; set;} 
        [Required]
        public string? Libelle { get; set; } 
        [Required]
        public decimal Montant { get; set; } 
        public int? GabaritId { get; set; } 
        public int? MembreId { get; set; }
        public int? CotisationId { get; set; }
        public int? AvanceId { get; set; }
        public int? CreditId { get; set; }
        public int? DeboursementId { get; set; }
        public int? EcheanceId { get; set; }
    }
}