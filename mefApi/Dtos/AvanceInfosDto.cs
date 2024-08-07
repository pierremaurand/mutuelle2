using mefApi.Enums;

namespace mefApi.Dtos
{
    public class AvanceInfosDto
    {
        public int? Id { get; set; } 
        public int? MembreId { get; set; } 
        public string? Nom { get; set; } 
        public decimal? MontantSollicite { get; set; } 
        public int? NombreEcheancesSollicite { get; set; } 
        public string? DateDemande { get; set; } 
        public AvanceDebourseDto? AvanceDebourse { get; set; }
        public ICollection<EcheanceAvanceDto>? Echeancier { get; set; } 
        public ICollection<MouvementDto>? Mouvements { get; set; }
        public StatusPret Status { get; set; }
        public decimal? Solde { get; set; }
    }
}