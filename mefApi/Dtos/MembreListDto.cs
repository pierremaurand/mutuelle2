namespace mefApi.Dtos
{
    public class MembreListDto
    {
        public int Id;
        public string Nom { get; set; } = string.Empty;
        public string Sexe { get; set; } = string.Empty;
        public string Poste { get; set; } = string.Empty;
        public string Lieu { get; set; } = string.Empty;
        public bool EstActif { get; set; } = false;
        public string Photo { get; set; } = string.Empty;
    }
}