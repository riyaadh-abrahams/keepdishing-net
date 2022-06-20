using Keepdishing.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Keepdishing.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("LogIn")]
        [ProducesResponseType(typeof(ErrorResponse), 401)]
        public async Task<IActionResult> LogIn(LoginInput credentials)
        {
            if (credentials.Username == null && credentials.Password == null) return StatusCode(401, new ErrorResponse("Email or Password cant be empty"));

            var result = await _signInManager.PasswordSignInAsync(credentials.Username, credentials.Password, credentials.RememberMe, false);
            if (result.Succeeded)
            {
                return new JsonResult(result);
            }
            return StatusCode(401, new ErrorResponse("Invalid Login Details"));

        }

        [HttpGet("GetCurrentUser")]
        public async Task<CurrentUser> GetCurrentUser() 
        {
            if (!User.Identity.IsAuthenticated) return null;

            var user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            return new CurrentUser
            {
                UserName = user.UserName,
                Email = user.Email,
                EmailConfirmed = user.EmailConfirmed
            };
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }

    public record LoginInput
    {
        [Required]
        public string Username { get; init; }

        [Required]
        public string Password { get; init; }

        public bool RememberMe { get; init; }

    }

    public record CurrentUser
    {

        [Required]
        public string UserName { get; init; }

        [Required]
        public string Email { get; init; }

        [Required]
        public bool EmailConfirmed { get; init; }
    }
}
