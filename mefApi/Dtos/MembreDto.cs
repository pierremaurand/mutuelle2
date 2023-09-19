using System.ComponentModel.DataAnnotations;

namespace mefApi.Dtos
{
    public class MembreDto
    {
        public int? Id;
        [Required(ErrorMessage = "Le Nom est obligatoire")]
        public string? Nom { get; set; } 
        [Required(ErrorMessage = "Le Sexe est obligatoire")]
        public int? SexeId { get; set; }
        [Required(ErrorMessage = "Le Poste est obligatoire")]
        public int? PosteId { get; set; } 
        [Required(ErrorMessage = "Le Lieu d'affectation est obligatoire")]
        public int? LieuAffectationId { get; set; }
        [Required(ErrorMessage = "La Date de naissance est obligatoire")]
        public string? DateNaissance { get; set; } 
        [Required(ErrorMessage = "La Date d'adhésion est obligatoire")]
        public string? DateAdhesion { get; set; } 
        [Required(ErrorMessage = "Le Lieu de naissance est obligatoire")]
        public string? LieuNaissance { get; set; } 
        [Required(ErrorMessage = "Le Contact est obligatoire")]
        public string? Contact { get; set; } 
        public string? Email { get; set; } 
        public bool? EstActif { get; set; }
        public string? Photo { get; set; }
    }
}