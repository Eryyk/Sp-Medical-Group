using Microsoft.EntityFrameworkCore;
using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Repository
{
    public class ConsultaRepository : IConsultaRepository
    {
        public void AtualizarDescricaoConsulta(Consulta consulta, int Id)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                ctx.Consulta.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public void AtualizarStatusConsulta(Consulta consulta, int Id)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                ctx.Consulta.Update(consulta);
                ctx.SaveChanges();
            }
        }

        public Consulta BuscarPorId(int Id)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                return ctx.Consulta.Find(Id);
            }
        }

        public void CadastrarConsulta(Consulta consulta)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                ctx.Consulta.Add(consulta);
                ctx.SaveChanges();
            }
        }

        public List<Consulta> ListarConsultas()
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                return ctx.Consulta.Include(x => x.IdMedicoNavigation.IdUsuarioNavigation).Include(x => x.IdProntuarioNavigation.IdUsuarioNavigation).Include(x => x.IdStatusNavigation).ToList();
            }
        }

        public List<Consulta> ListarConsultaUsuario(int IdUsuario, string IdTipoUsuario)
        {
            using (Sp_Medical_Group_Context ctx = new Sp_Medical_Group_Context())
            {
                if(IdTipoUsuario == "Medico")
                {
                    Medico medico;
                    medico = ctx.Medico.FirstOrDefault(x => x.IdUsuario == IdUsuario);
                    return ctx.Consulta.Include(x => x.IdMedicoNavigation.IdUsuarioNavigation).Include(x => x.IdProntuarioNavigation.IdUsuarioNavigation).Include(x => x.IdStatusNavigation).Where(x => x.IdMedico == medico.Id).ToList();
                }
                else if (IdTipoUsuario == "Paciente ")
                {
                    Prontuarios prontuario;
                    prontuario = ctx.Prontuarios.FirstOrDefault(x => x.IdUsuario == IdUsuario);
                    return ctx.Consulta.Include(x => x.IdMedicoNavigation.IdUsuarioNavigation).Include(x => x.IdProntuarioNavigation.IdUsuarioNavigation).Include(x => x.IdStatusNavigation).Where(x => x.IdProntuario == prontuario.Id).ToList();
                }
                return null;
            }
        }

    }
}
