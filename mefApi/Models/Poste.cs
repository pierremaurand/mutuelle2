using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Poste : BaseEntity
    {
        [Required]
        public string Libelle { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}