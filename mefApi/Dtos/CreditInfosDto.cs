using mefApi.Enums;

namespace mefApi.Dtos
{
    public class CreditInfosDto
    {
        public int? Id { get; set; }
        public int? MembreId { get; set; }
        public decimal? MontantSollicite { get; set; }
        public int DureeSollicite { get; set; } 
        public string? DateDemande { get; set; }
        public CreditDebourseDto? CreditDebourse { get; set; }
        public ICollection<MouvementDto>? Mouvements { get; set; }
        public ICollection<EcheanceCreditDto>? Echeancier { get; set; }
        public string? Nom { get; set; }
        public StatusPret? Status { get; set; }
        public decimal? Solde { get; set; }
    }
}