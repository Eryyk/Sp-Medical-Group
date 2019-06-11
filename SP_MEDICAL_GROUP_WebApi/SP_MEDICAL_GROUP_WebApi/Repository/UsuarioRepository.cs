using Microsoft.EntityFrameworkCore;
using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public List<Usuarios> ListaUsuarios()
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                return ctx.Usuarios.ToList();
            }
        }

        public Usuarios BuscarPorEmailSenha(string email, string senha)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                Usuarios usuario = ctx.Usuarios.Include(x => x.IdTipoUsuarioNavigation).Where(x => x.Email == email && x.Senha == senha).FirstOrDefault();

                return usuario;
            }
        }

        public void CadastrarUsuario(Usuarios usuario)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }
    }
}
