
using FluentEmail.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keepdishing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IFluentEmail _fluentEmail;

        public TestController(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }

        [HttpGet("TestEmail")]
        public async Task<IActionResult> TestEmail()
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Emails", "dist", "confirmation.html");

            var result = await _fluentEmail
                .To("riyaadh.abr@gmail.com")
                .Subject("Test")
                .UsingTemplateFromFile(file, new { ConfirmationURL = "Luke", SiteUrl=Environment.GetEnvironmentVariable("SITE_URL") })
                .Tag("Test")
                .SendAsync();

            return await Task.FromResult(Ok("Hello World"));
        }
    }
}
