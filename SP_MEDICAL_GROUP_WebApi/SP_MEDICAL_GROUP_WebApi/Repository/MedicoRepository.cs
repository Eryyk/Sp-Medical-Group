using Microsoft.EntityFrameworkCore;
using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Repository
{
    public class MedicoRepository : IMedicoRepository
    {
        public List<Medico> ListarMedicos()
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                return ctx.Medico.Include(x => x.IdEspecialidadeNavigation).Include(x => x.IdClinicaNavigation).Include(x => x.IdUsuarioNavigation).ToList();
            }
        }

        public void CadastrarMedico(Medico medico)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                ctx.Medico.Add(medico);
                ctx.SaveChanges();
            }
        }
    }
}
