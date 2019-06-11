using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SP_MEDICAL_GROUP_WebApi.Interfaces;
using SP_MEDICAL_GROUP_WebApi.Repository;

namespace SP_MEDICAL_GROUP_WebApi.Controller
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadeController : ControllerBase
    {
        private IEspecialidadeRepository EspecialidadeRepository { get; set; }

        public EspecialidadeController()
        {
            EspecialidadeRepository = new EspecialidadeRepository();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            try
            {
                return Ok(EspecialidadeRepository.ListarEspecialidade());
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }
    }
}