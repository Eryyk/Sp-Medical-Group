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
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository ClinicaRepository { get; set; }

        public ClinicasController()
        {
            ClinicaRepository = new ClinicaRepository();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            try
            {
                return Ok(ClinicaRepository.ListarClinica());
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CadastrarClinica(Clinica clinica)
        {
            try
            {
                ClinicaRepository.CadastrarClinica(clinica);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Deu Ruim " });
            }
        }
    }
}