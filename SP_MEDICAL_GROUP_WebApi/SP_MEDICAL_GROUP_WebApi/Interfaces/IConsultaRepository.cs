using SP_MEDICAL_GROUP_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Interfaces
{
    public interface IConsultaRepository
    {
        List<Consulta> ListarConsultas();

        void CadastrarConsulta(Consulta consulta);

        Consulta BuscarPorId(int Id);

        void AtualizarDescricaoConsulta(Consulta consulta, int Id);

        void AtualizarStatusConsulta(Consulta consulta, int Id);

        List<Consulta> ListarConsultaUsuario(int IdUsuario, string IdTipoUsuario);
    }
}
