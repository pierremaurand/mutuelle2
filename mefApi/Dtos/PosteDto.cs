using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class PosteDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Le libellé est obligatoire")] 
        public string Libelle { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}