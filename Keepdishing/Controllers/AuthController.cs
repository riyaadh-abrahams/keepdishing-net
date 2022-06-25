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
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("LogIn")]
        public async Task<IActionResult> LogIn(LoginInput credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Username, credentials.Password, credentials.RememberMe, false);
            return result.Succeeded ? Ok(result) : Unauthorized(new ErrorResponse("Invalid Login Details"));
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignupUpInput signupUpInput)
        {
            var user = new ApplicationUser
            {
                Email = signupUpInput.Email,
                UserName = signupUpInput.Email,
                FirstName = signupUpInput.FirstName,
                Surname = signupUpInput.Surname
            };

            var result = await _userManager.CreateAsync(user, signupUpInput.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, true);
                return Ok(result);
            }

            return BadRequest(result);
        }
    

    [HttpGet("GetCurrentUser")]
        public async Task<CurrentUser> GetCurrentUser() 
        {
            if (!User.Identity.IsAuthenticated) return null;

            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new CurrentUser
            {
                Firstname = user.FirstName,
                Surname = user.Surname,
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

    public record SignupUpInput
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }

    public record CurrentUser
    {
        [Required]

        public string Firstname { get; init; }
        [Required]

        public string Surname { get; init; }
        [Required]
        public string UserName { get; init; }

        [Required]
        public string Email { get; init; }

        [Required]
        public bool EmailConfirmed { get; init; }
    }
}
