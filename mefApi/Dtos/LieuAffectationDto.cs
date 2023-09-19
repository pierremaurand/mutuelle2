using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class LieuAffectationDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Le lieu est obligatoire")]
        public string Lieu { get; set; } = string.Empty;
    }
}