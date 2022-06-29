using FluentEmail.Core;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Keepdishing.Services
{
    public class EmailService : IEmailService
    {
        private readonly IFluentEmail _fluentEmail;

        public EmailService(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }


        public async Task SendEmailConfirmation(string confirmationUrl)
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Emails", "dist", "confirmation.html");

            var result = await _fluentEmail
                .To("riyaadh.abr@gmail.com")
                .Subject("Test")
                .UsingTemplateFromFile(file, new { 
                    ConfirmationURL = confirmationUrl, 
                    SiteUrl = Environment.GetEnvironmentVariable("SITE_URL") 
                })
                .Tag("Test")
                .SendAsync();
        }
            
    }
}
