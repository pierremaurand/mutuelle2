namespace mefApi.Dtos
{
    public class InfosRbCreditDto
    {
        public string DateMouvement { get; set; } = string.Empty;
        public ICollection<EcheanceCreditDto> Echeancier { get; set; } = new List<EcheanceCreditDto>();
    }
}