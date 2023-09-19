using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class CompteComptableDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Le compte est obligatoire")]
        public string Compte { get; set; } = string.Empty;
        [Required(ErrorMessage = "Le libellé est obligatoire")]
        public string Libelle { get; set; } = string.Empty;
    }
}