using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class StatusConsulta
    {
        public StatusConsulta()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int Id { get; set; }
        public string TipoConsulta { get; set; }

        public ICollection<Consulta> Consulta { get; set; }
    }
}
