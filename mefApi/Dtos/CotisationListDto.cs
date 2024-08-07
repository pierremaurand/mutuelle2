namespace mefApi.Dtos
{
    public class CotisationListDto
    {
        public int? Id { get; set; }
        public string? Nom { get; set; }
        public bool? EstActif { get; set; }
        public ICollection<CotisationDto>? Cotisations { get; set; }
        public decimal Solde { get; set; }
    }
}