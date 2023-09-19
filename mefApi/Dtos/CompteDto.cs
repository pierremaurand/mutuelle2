namespace mefApi.Dtos
{
    public class CompteDto
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public bool? EstActif { get; set; }
        public ICollection<MouvementDto>? Mouvements { get; set; }
        public decimal Solde { get; set; }
    }
}