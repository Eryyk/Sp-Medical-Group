using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuarios> ListaUsuarios();

        Usuarios BuscarPorEmailSenha(string email, string senha);

        void CadastrarUsuario(Usuarios usuario);
    }
}
