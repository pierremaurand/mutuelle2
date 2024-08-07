namespace mefApi.Dtos
{
    public class InfosRbAvanceDto
    {
        public string DateMouvement { get; set; } = string.Empty;
        public ICollection<EcheanceAvanceDto> Echeancier { get; set; } = new List<EcheanceAvanceDto>();
    }
}