namespace mefApi.Models
{
    public class Compte
    {
        public Membre Membre { get; set; } = new Membre();
        public IEnumerable<Mouvement> Mouvements { get; set; } = new List<Mouvement>();
    }
}