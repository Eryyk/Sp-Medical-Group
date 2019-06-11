using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Repository
{
    public class ClinicaRepository : IClinicaRepository
    {
        public void CadastrarClinica(Clinica clinica)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                ctx.Clinica.Add(clinica);
                ctx.SaveChanges();
            }
        }

        public List<Clinica> ListarClinica()
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                return ctx.Clinica.ToList();
            }
        }
    }
}
