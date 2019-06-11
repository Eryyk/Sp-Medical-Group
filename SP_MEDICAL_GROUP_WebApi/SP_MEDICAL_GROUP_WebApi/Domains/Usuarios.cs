using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class Usuarios
    {
        public Usuarios()
        {
            Medico = new HashSet<Medico>();
            Prontuarios = new HashSet<Prontuarios>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int? IdTipoUsuario { get; set; }

        public TiposUsuarios IdTipoUsuarioNavigation { get; set; }
        public ICollection<Medico> Medico { get; set; }
        public ICollection<Prontuarios> Prontuarios { get; set; }
    }
}
