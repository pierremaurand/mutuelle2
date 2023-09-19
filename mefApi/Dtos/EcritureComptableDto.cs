using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace mefApi.Dtos
{
    public class EcritureComptableDto
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage ="Le libellé est obligatoire")]
        public string Libelle { get; set; } = string.Empty;
        [Required(ErrorMessage ="Le montant est obligatoire")]
        public decimal Montant { get; set; } = 0;
        [Required(ErrorMessage ="Le mouvement à lier avec cette écriture est obligatoire")]
        public int MouvementId { get; set; } = 0;
        public bool EstApplique { get; set; } = false;
    }
}