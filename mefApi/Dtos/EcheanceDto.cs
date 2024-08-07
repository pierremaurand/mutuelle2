namespace mefApi.Dtos
{
    public class EcheanceDto
    {
        public int Id { get; set; }
        public string DateEcheance { get; set; } = string.Empty;
        public decimal MontantEcheance { get; set; } 
        public decimal? Capital { get; set; }
        public decimal? Interet { get; set; }
        public int MembreId { get; set; }
        public int? AvanceId { get; set; }
        public int? CreditId { get; set; }
    }
}