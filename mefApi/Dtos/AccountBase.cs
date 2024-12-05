using System.ComponentModel.DataAnnotations;

namespace mefapi.Dtos
{
    public class AccountBase
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
