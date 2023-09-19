using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mefApi.Models;

namespace mefApi.Dtos
{
    public class MouvementInfosDto
    {
        public int Id { get; set; } 
        public string DateMvt { get; set; } = string.Empty;
        public TypeOperation TypeOperation { get; set;} 
        public int GabaritId { get; set; } 
        public string Libelle { get; set; } = string.Empty;
        public decimal Montant { get; set; } = 0;
        public int? MembreId { get; set; }
        public int? CotisationId { get; set; }
        public int? AvanceId { get; set; }
        public int? AvancDebourseId { get; set; }
        public int? EcheanceAvanceId { get; set; }
        public int? CreditId { get; set; }
        public int? CreditDebourseId { get; set; }
        public int? EcheanceCreditId { get; set; }
    }
}