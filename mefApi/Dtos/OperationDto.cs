using System.ComponentModel.DataAnnotations;
using mefApi.Models;

namespace mefApi.Dtos
{
    public class OperationDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Le gabarit est obligatoire")] 
        public int GabaritId { get; set; } = 0;
        [Required(ErrorMessage = "Le compte est obligatoire")]
        public int CompteComptableId { get; set; } = 0;
        [Required(ErrorMessage = "Le type d'opération est obligatoire")] 
        public TypeOperation TypeOperation { get; set;} = 0;
        [Required(ErrorMessage = "Le taux est obligatoire")] 
        public decimal Taux { get; set; } = 0;
    }
}