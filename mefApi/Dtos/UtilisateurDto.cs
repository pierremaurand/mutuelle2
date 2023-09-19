using System.ComponentModel.DataAnnotations;
using mefApi.Models;

namespace mefApi.Dtos
{
    public class UtilisateurDto
    {
        public int? Id { get; set; }
        [Required(ErrorMessage ="Le nom d'utilisateur est obligatoire")]
        public string NomUtilisateur { get; set; } = string.Empty;
        public int? MembreId { get; set; }
        public TypeUtilisateur? Type { get; set; } 
    }
}