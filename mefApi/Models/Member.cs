using mefApi.Models;
using System.ComponentModel.DataAnnotations;

namespace mefapi.Models
{
    public class Member : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public bool Status { get; set; } // True Active / False Inactive
        [Required]
        public bool Gender { get; set; } // True Woman / False Man
        [Required]
        public DateTime BirthDay { get; set; } 
        public string LieuNaissance { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
