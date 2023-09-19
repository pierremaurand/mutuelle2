using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class MoisDto
    {
        public int Id { get; set; } = 0;
        [MaxLength(2)]
        public string Valeur { get; set; } = string.Empty;
        [MaxLength(10)]
        public string Libelle { get; set; } = string.Empty;
    }
}