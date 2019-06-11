using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SP_MEDICAL_GROUP_WebApi.Domains;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using SP_MEDICAL_GROUP_WebApi.Repository;

namespace SP_MEDICAL_GROUP_WebApi.Controller
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository MedicoRepository { get; set; }

        public MedicosController()
        {
            MedicoRepository = new MedicoRepository();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            try
            {
                return Ok(MedicoRepository.ListarMedicos());
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CadastraMedico(Medico medico)
        {
            try
            {
                MedicoRepository.CadastrarMedico(medico);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }
    }
}