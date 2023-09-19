using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class MembreInfosDto
    {
        public int? Id { get; set; }
        public string? Nom { get; set; } 
        public string? Sexe { get; set; }
        public int? SexeId { get; set; }
        public string? Poste { get; set; }
        public int? PosteId { get; set; }
        public string? Lieu { get; set; }
        public int? LieuAffectationId { get; set; }
        public string? DateNaissance { get; set; } 
        public string? DateAdhesion { get; set; } 
        public string? LieuNaissance { get; set; } 
        public string? Contact { get; set; } 
        public string? Email { get; set; } 
        public bool? EstActif { get; set; } 
        public string? Photo { get; set; } 
    }
}