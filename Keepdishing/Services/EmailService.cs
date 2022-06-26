using SendGrid;
using SendGrid.Helpers.Mail;

namespace Keepdishing.Services
{
    public class EmailService : IEmailService
    {
        private readonly SendGridClient _client;
        public EmailService()
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            _client = new SendGridClient(apiKey);
        }

        public async Task SendEmail()
        {
            var from = new EmailAddress("info@keepdishing.co.za", "Keepdishing");
            var subject = "Sending with Twilio SendGrid is Fun";
            var to = new EmailAddress("riyaadh.abr@gmail.com", "Riyaadh");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await _client.SendEmailAsync(msg).ConfigureAwait(false);
        }
            
    }
}
