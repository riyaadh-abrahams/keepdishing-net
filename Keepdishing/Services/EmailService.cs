using SendGrid;

namespace Keepdishing.Services
{
    public class EmailService : IEmailService
    {
        private readonly SendGridClient _client;
        public EmailService()
        {
            var apiKey = Environment.GetEnvironmentVariable("NAME_OF_THE_ENVIRONMENT_VARIABLE_FOR_YOUR_SENDGRID_KEY");
            var _client = new SendGridClient(apiKey);
        }
    }
}
