using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Mois : BaseEntity
    {
        [MaxLength(2)]
        public string Valeur { get; set; } = string.Empty;
        [MaxLength(10)]
        public string Libelle { get; set; } = string.Empty;
    }
}