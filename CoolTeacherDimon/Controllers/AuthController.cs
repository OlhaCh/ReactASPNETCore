using CoolTeacherDimon.Services.Abstration;
using CoolTeacherDimon.ViewModels;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoolTeacherDimon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IJwtService jwtService;

        public AuthController(UserManager<ApplicationUser> userManager,
                              IJwtService jwtService)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserModel registerUser)
        {
            var user = new ApplicationUser
            {
                Email = registerUser.Email,
                UserName = registerUser.Email,
                FirstName = registerUser.FirstName,
                LastName = registerUser.LastName
            };

            await userManager.CreateAsync(user, registerUser.Password);
            return Ok();
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<ActionResult<string>> Login([FromBody] LoginUserModel loginUser)
        {
            var user = await userManager.FindByNameAsync(loginUser.Email);

            if (user == null)
            {
                return NotFound();
            }

            if (await userManager.CheckPasswordAsync(user, loginUser.Password))
            {
                return await jwtService.CreateTokenAsync(user);
            }
            else
            {
                return BadRequest("Incorrect password!");
            }
        }
    }
}
