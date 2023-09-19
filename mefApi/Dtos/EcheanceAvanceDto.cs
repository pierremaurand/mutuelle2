using System.ComponentModel.DataAnnotations;
using mefApi.Models;

namespace mefApi.Dtos
{
    public class EcheanceAvanceDto
    {
        public int Id { get; set; } = 0;
        [Required]
        public string DateEcheance { get; set; } = string.Empty;
        [Required]
        public decimal MontantEcheance { get; set; } = 0;
        public int? AvanceId { get; set; }
        public decimal? MontantPaye { get; set; }
        public decimal Montant { get; set; }
        public ICollection<MouvementDto>? Mouvements { get; set; }
    }
}