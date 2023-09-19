using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Sexe : BaseEntity
    {
        [Required]
        public string Nom { get; set; } = string.Empty;
        public string Symbole { get; set; } = string.Empty;
    }
}