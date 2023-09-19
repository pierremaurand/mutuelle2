using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class UploadImage
    {
        public int MembreId { get; set; } = 0;
        public string Image { get; set; } = string.Empty;
        public string Type { get; set; } = "png";
    }
}