using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class LoginResDto
    {
        public string Nom { get; set; } = string.Empty;
        public int Id { get; set; } 
        public int? MembreId { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}