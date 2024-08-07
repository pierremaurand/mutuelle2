using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class CompteComptable : BaseEntity
    {
        [Required]
        public string Compte { get; set; } = string.Empty;
        [Required]
        public string Libelle { get; set; } = string.Empty;
    }
}