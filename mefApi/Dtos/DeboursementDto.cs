namespace mefApi.Dtos
{
    public class DeboursementDto
    {
        public int Id { get; set; }
        public decimal MontantAccorde { get; set; } 
        public int DureeAccordee { get; set; }
        public string DateDecaissement { get; set; } = string.Empty;
        public int MembreId { get; set; }
        public decimal? MontantCommission { get; set; } 
        public decimal? MontantInteret { get; set; } 
    }
}