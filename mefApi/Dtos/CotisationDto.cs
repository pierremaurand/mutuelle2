namespace mefApi.Dtos
{
    public class CotisationDto
    {
        public int Id { get; set; } = 0;
        public int MembreId { get; set; } = 0;
        public int MoisId { get; set; } = 0;
        public int Annee { get; set; } = 0;
        public decimal Montant { get; set; } = 0;
    }
}