﻿using System;
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
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            try
            {
                return Ok(UsuarioRepository.ListaUsuarios());
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CadastraUsuario(Usuarios usuario)
        {
            try
            {
                UsuarioRepository.CadastrarUsuario(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message + "Deu Ruim :) " });
            }
        }
    }
}