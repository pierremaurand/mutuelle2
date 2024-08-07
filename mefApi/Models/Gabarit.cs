using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Gabarit : BaseEntity
    {
        [Required]
        public string Libelle { get; set; } = string.Empty;
        public bool EstActif { get; set; } = true;
    }
}