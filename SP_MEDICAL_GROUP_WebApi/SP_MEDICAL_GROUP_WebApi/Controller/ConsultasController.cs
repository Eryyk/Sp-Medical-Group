using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using SP_MEDICAL_GROUP_WebApi.Repository;

namespace SP_MEDICAL_GROUP_WebApi.Controller
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository ConsultaRepository { get; set; }

        public ConsultasController()
        {
            ConsultaRepository = new ConsultaRepository();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            try
            {
                return Ok(ConsultaRepository.ListarConsultas());
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult Cadastrar(Consulta consulta)
        {
            try
            {
                ConsultaRepository.CadastrarConsulta(consulta);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Deu Ruim " });
            }
        }

        [HttpGet]
        [Authorize]
        [Route("consultaUsuario")]
        public IActionResult ListarConsultasUsuario()
        {
            try
            {
                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                string IdTipoUsuario = Convert.ToString(HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role).Value);

                List<Consulta> consultas = ConsultaRepository.ListarConsultaUsuario(IdUsuario, IdTipoUsuario);

                return Ok(consultas);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :("});
            }
        }

        [HttpPut("{Id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult AtualizarStatusConsulta(Consulta consulta, int Id)
        {
            try
            {
                Consulta consultaReapositorio = ConsultaRepository.BuscarPorId(Id);
                if(consultaReapositorio == null)
                {
                    return NotFound();
                }
                consultaReapositorio.IdStatus = consulta.IdStatus;
                ConsultaRepository.AtualizarStatusConsulta(consultaReapositorio, Id);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :(" });
            }
        }

        [HttpPut("descricao/{Id}")]
        [Authorize(Roles = "Medico")]
        public IActionResult AtualizarDescricaoConsulta(Consulta consulta, int Id)
        {
            try
            {
                Consulta consultaConsulta = ConsultaRepository.BuscarPorId(Id);
                if (consultaConsulta == null)
                {
                    return NotFound();
                }
                consultaConsulta.Descricao = consulta.Descricao;
                ConsultaRepository.AtualizarStatusConsulta(consultaConsulta, Id);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :(" });
            }
        }
    }
}