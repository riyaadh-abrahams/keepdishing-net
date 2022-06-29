namespace Keepdishing.Services
{
    public interface IEmailService
    {
        Task SendEmailConfirmation(string confirmationUrl);
    }
}
