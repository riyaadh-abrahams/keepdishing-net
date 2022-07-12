using FluentEmail.Core;
using SendGrid;
using SendGrid.Helpers.Mail;
using Serilog;

namespace Keepdishing.Services
{
    public class EmailService : IEmailService
    {
        private readonly IFluentEmail _fluentEmail;
        private readonly IWebHostEnvironment _env;
        private readonly string _devEmail;


        public EmailService(IFluentEmail fluentEmail, IWebHostEnvironment env)
        {
            _fluentEmail = fluentEmail;
            _devEmail = Environment.GetEnvironmentVariable("DEV_EMAIL");
            _env = env;
        }


        public async Task SendEmailConfirmation(string confirmationUrl, string emailAddress)
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Emails", "dist", "confirmation.html");
            var email = _env.IsDevelopment() ? _devEmail : emailAddress;

            var result = await _fluentEmail
                .To(email)
                .Subject("Confirm your account")
                .UsingTemplateFromFile(file, new { 
                    ConfirmationURL = confirmationUrl, 
                    SiteUrl = Environment.GetEnvironmentVariable("SITE_URL") 
                })
                .Tag("Test")
                .SendAsync();

            Log.Information("Sent Email Confirmation: {@result}", new { result });
        }

        public async Task SendForgotPasswordEmail(string confirmationUrl, string emailAddress)
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Emails", "dist", "reset-password.html");
            var email = _env.IsDevelopment() ? _devEmail : emailAddress;

            var result = await _fluentEmail
                .To(email)
                .Subject("Reset your password")
                .UsingTemplateFromFile(file, new
                {
                    ConfirmationURL = confirmationUrl,
                    SiteUrl = Environment.GetEnvironmentVariable("SITE_URL")
                })
                .Tag("Test")
                .SendAsync();

            Log.Information("Sent Email Confirmation: {@result}", new { result });
        }

    }
}
