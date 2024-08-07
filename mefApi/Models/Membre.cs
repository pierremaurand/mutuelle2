using System.ComponentModel.DataAnnotations;

namespace mefApi.Models
{
    public class Membre : BaseEntity
    {
        [Required]
        public string Nom { get; set; } = string.Empty;
        public bool EstActif { get; set; } = false;
        [Required]
        public int SexeId { get; set; } 
        public Sexe? Sexe { get; set; } 
        [Required]
        public int LieuAffectationId { get; set; } 
        public LieuAffectation? LieuAffectation { get; set; } 
        [Required]
        public int PosteId { get; set; } 
        public Poste? Poste { get; set; }
        public string DateNaissance { get; set; } = string.Empty;
        [Required]
        public string DateAdhesion { get; set; } = string.Empty;
        public string LieuNaissance { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public ICollection<Mouvement>? Mouvements { get; set; }
        public Utilisateur? Utilisateur { get; set; }
        public ICollection<Cotisation>? Cotisations { get; set; }
        public ICollection<Avance>? Avances { get; set; }
        public ICollection<Credit>? Credits { get; set; }
    }
}