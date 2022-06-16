using Keepdishing.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Keepdishing.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public record LoginInput(string email, string password, bool rememberMe);

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("LogIn")]
        public async Task<IActionResult> LogIn(LoginInput credentials)
        {
            if (credentials.email != null && credentials.password != null)
            {
                var result = await _signInManager.PasswordSignInAsync(credentials.email, credentials.password, credentials.rememberMe, false);
                if (result.Succeeded)
                {
                    return new JsonResult(result);
                }
                return StatusCode(401, "Invalid Log In"); 
            }
            return StatusCode(401, "Email or Password cant be empty");

        }

        [HttpGet("GetCurrentUser")]
        public async Task<CurrentUser> GetCurrentUser() 
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
                return new CurrentUser(user.UserName, user.Email, user.EmailConfirmed);
            }
            else
            {
                return null;
            }
            
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}
