namespace mefApi.Dtos
{
    public class UtilisateurListDto
    {
        public int Id { get; set; } = 0;
        public string NomUtilisateur { get; set; } = string.Empty;
        public MembreDto Membre { get; set; } = new MembreDto();
    }
}