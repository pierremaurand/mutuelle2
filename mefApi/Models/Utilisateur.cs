namespace mefApi.Models
{
    public class Utilisateur : BaseEntity
    {
        public string NomUtilisateur { get; set; } = string.Empty;
        public byte[]? MotDePasse { get; set; }
        public byte[]? ClesMotDePasse { get; set; }
        public int? MembreId { get; set; }
        public Membre? Membre { get; set; }
        public TypeUtilisateur? Type { get; set; } 
    }
}