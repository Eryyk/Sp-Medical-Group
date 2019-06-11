using SP_MEDICAL_GROUP_WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SP_MEDICAL_GROUP_WebApi.Interfaces
{
    public interface IProntuarioRepository
    {
        List<Prontuarios> ListarProntuario();

        void CadastrarProntuario(Prontuarios prontuario);
    }
}
