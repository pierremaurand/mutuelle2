using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class CreditDto
    {
        public int Id { get; set; } = 0;
        [Required]
        public int MembreId { get; set; } = 0;
        [Required]
        public decimal MontantSollicite { get; set; } = 0;
        [Required]
        public int DureeSollicite { get; set; } = 0;
        [Required]
        public string DateDemande { get; set; } = string.Empty;
        public int? DeboursementId { get; set;}
    }
}