using System.ComponentModel.DataAnnotations;

namespace mefapi.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        [Required]
        public string Fullname { get; set; } = string.Empty;
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        public string? Photo {  get; set; }
    }
}
