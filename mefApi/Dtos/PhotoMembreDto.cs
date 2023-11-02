using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class PhotoMembreDto
    {
        public string? Image { get; set; }
        public string? Photo { get; set; }
        public string Type { get; set; } = "png";
    }
}