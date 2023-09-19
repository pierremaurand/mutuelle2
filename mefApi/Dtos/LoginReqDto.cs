using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class LoginReqDto
    {

        [Required(ErrorMessage = "Le nom d'utilisateur est obligatoire")]
        public string Login { get; set;} = string.Empty;

        [Required(ErrorMessage = "Le mot de passe est obligatoire")]
        public string Password { get; set; } = string.Empty;
    }
}