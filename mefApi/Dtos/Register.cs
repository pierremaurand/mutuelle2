using System.ComponentModel.DataAnnotations;

namespace mefapi.Dtos
{
    public class Register : AccountBase
    {
        [Required]
        [MinLength(5)]
        [MaxLength(100)]
        public string Fullname { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;
        public string? Photo { get; set; }
    }
}
