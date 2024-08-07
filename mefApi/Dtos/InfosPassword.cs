using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class InfosPassword
    {
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}