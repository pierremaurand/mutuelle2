using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class InfosAvanceDebourseDto
    {
        [Required]
        public AvanceDto Avance { get; set; } = new AvanceDto();
        [Required]
        public AvanceDebourseDto AvanceDebourse { get; set; } = new AvanceDebourseDto();
        [Required]
        public ICollection<EcheanceAvanceDto> Echeancier { get; set; }  = new List<EcheanceAvanceDto>();
    }
}