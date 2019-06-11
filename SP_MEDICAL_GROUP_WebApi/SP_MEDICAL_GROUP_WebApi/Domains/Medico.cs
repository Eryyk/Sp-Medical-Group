using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Medico
    {
        public Medico()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int Id { get; set; }
        public string Crm { get; set; }
        public int? IdEspecialidade { get; set; }
        public int? IdClinica { get; set; }
        public int? IdUsuario { get; set; }

        public Clinica IdClinicaNavigation { get; set; }
        public Especialidades IdEspecialidadeNavigation { get; set; }
        public Usuarios IdUsuarioNavigation { get; set; }
        public ICollection<Consulta> Consulta { get; set; }
    }
}
