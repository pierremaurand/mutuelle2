namespace mefApi.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime ModifiedAt {  get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; } 
    }
}