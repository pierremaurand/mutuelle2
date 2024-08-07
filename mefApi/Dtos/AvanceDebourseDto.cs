using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class AvanceDebourseDto
    {
        public int Id { get; set; } = 0;
        [Required]
        public decimal MontantApprouve { get; set; } = 0;
        [Required]
        public int NombreEcheancesApprouve { get; set; } = 0;
        [Required]
        public string DateDecaissement { get; set; } = string.Empty;
        public MouvementDto? Mouvement { get; set; }
    }
}