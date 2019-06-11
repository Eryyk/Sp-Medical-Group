using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Consulta
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        [Required(ErrorMessage = "Informe o Medico")]
        public int? IdMedico { get; set; }
        public int? IdProntuario { get; set; } 
        public DateTime DataAgendamento { get; set; }
        public int? IdStatus { get; set; }

        public Medico IdMedicoNavigation { get; set; }
        public Prontuarios IdProntuarioNavigation { get; set; }
        public StatusConsulta IdStatusNavigation { get; set; }
    }
}
