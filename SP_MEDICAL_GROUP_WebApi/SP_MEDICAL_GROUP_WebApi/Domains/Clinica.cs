using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medico = new HashSet<Medico>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string HorarioDeAtendimento { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }

        public ICollection<Medico> Medico { get; set; }
    }
}
