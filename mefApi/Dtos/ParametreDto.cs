using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class ParametreDto
    {
        public int Id { get; set; }
        public string Libelle { get; set; } = string.Empty;
        public string Valeur { get; set; } = string.Empty;
    }
}