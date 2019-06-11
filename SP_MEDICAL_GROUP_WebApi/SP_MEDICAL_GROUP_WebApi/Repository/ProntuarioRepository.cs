using Microsoft.EntityFrameworkCore;
using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Repository
{
    public class ProntuarioRepository : IProntuarioRepository
    {
        public void CadastrarProntuario(Prontuarios prontuario)
        {
            throw new NotImplementedException();
        }

        public List<Prontuarios> ListarProntuario()
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                return ctx.Prontuarios.Include(x => x.IdUsuarioNavigation).ToList();
            }
        }
    }
}
