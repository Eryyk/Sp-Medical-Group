using System;
using System.Collections.Generic;

namespace SP_MEDICAL_GROUP_WebApi.Domains
{
    public partial class TiposUsuarios
    {
        public TiposUsuarios()
        {
            Usuarios = new HashSet<Usuarios>();
        }

        public int Id { get; set; }
        public string Tipo { get; set; }

        public ICollection<Usuarios> Usuarios { get; set; }
    }
}
