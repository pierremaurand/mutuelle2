namespace mefApi.Dtos
{
    public class InfosCotisationDto
    {
        public int Id { get; set; } = 0; 
        public ICollection<CotisationDto> Cotisations { get; set; } = new List<CotisationDto>();
    }
}