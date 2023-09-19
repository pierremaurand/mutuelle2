using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class SexeDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Le nom est obligatoire")] 
        public string Nom { get; set; } = string.Empty;
        public string Symbole { get; set; } = string.Empty;
    }
}