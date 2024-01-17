using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Models
{
    public class Parametre : BaseEntity
    {
        public string Libelle { get; set; } = string.Empty;
        public string Valeur { get; set; } = string.Empty;
    }
}