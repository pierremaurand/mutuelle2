using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class GabaritDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Le libellé est obligatoire")] 
        public string Libelle { get; set; } = string.Empty;
        public bool EstActif { get; set; } = false;
        public IEnumerable<OperationDto> Operations { get; set; } = new List<OperationDto>();
    }
}