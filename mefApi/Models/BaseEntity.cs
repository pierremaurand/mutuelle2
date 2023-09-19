using System;

namespace mefApi.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime ModifieLe { get; set; } = DateTime.Now;
        public int? ModifiePar { get; set; }
    }
}