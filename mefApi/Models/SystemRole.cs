using System.ComponentModel.DataAnnotations;

namespace mefapi.Models
{
    public class SystemRole
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
