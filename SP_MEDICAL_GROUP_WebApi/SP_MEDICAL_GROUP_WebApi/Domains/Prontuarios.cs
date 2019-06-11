using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Prontuarios
    {
        public Prontuarios()
        {
            Consulta = new HashSet<Consulta>();
        }

        public int Id { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime DataNacimento { get; set; }
        public string Telefone { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string Endereco { get; set; }

        public Usuarios IdUsuarioNavigation { get; set; }
        public ICollection<Consulta> Consulta { get; set; }
    }
}
