using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Especialidades
    {
        public Especialidades()
        {
            Medico = new HashSet<Medico>();
        }

        public int Id { get; set; }
        public string Especialidade { get; set; }

        public ICollection<Medico> Medico { get; set; }

    }
}
