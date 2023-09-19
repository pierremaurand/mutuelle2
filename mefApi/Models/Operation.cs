using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Operation : BaseEntity
    {
        [Required]
        public int GabaritId { get; set; } = 0;
        public Gabarit? Gabarit { get; set; }
        [Required]
        public int CompteComptableId { get; set; } = 0;
        public CompteComptable? CompteComptable { get; set; }
        [Required]
        public TypeOperation TypeOperation { get; set;} = 0;
        [Required]
        public decimal Taux { get; set; } = 0;
    }
}