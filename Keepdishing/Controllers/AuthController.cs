using Keepdishing.Model;
using Keepdishing.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Web;

namespace Keepdishing.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailService = emailService;
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

        [HttpPost("LogIn")]
        public async Task<IActionResult> LogIn(LoginInput credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Username, credentials.Password, credentials.RememberMe, false);
            return result.Succeeded ? Ok(result) : Unauthorized(new ErrorResponse("Invalid Login Details"));
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
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
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action("ConfirmEmail", "Auth", new { token, email = user.Email }, Request.Scheme);
                await _emailService.SendEmailConfirmation(confirmationLink, user.Email);

                await _signInManager.SignInAsync(user, true);
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound();

            var result = await _userManager.ConfirmEmailAsync(user, token);
            return result.Succeeded ? Redirect("/app") : BadRequest();
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordInput forgotPasswordInput)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordInput.Email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                return Ok();
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            //var confirmationLink =$"{Request.Scheme}://{Request.Host}/auth/reset-password?token=${token}&email={forgotPasswordInput.Email}";
            var confirmationLink = Url.Action("ConfirmForgotPassword", "Auth", new { token, email = user.Email }, Request.Scheme);

            await _emailService.SendForgotPasswordEmail(confirmationLink, forgotPasswordInput.Email);
            return Ok();
        }

        [HttpGet("ConfirmForgotPassword")]
        public RedirectResult ConfirmForgotPassword(string token, string email)
        {
            return Redirect("/auth/reset-password");
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordInput resetPasswordInput)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordInput.Email);
            if (user == null) return NotFound();

            var result = await _userManager.ResetPasswordAsync(user, resetPasswordInput.Token, resetPasswordInput.Password);
            return result.Succeeded ? Ok(result) : BadRequest(result);
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
    public record ForgotPasswordInput
    {

        [Required]
        public string Email { get; set; }

    }

    public record ResetPasswordInput
    {
        [Required]
        public string Token { get; set; }

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
