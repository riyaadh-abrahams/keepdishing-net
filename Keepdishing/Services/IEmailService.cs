namespace Keepdishing.Services
{
    public interface IEmailService
    {
        Task SendEmailConfirmation(string confirmationUrl, string emailAddress);
        Task SendForgotPasswordEmail(string confirmationUrl, string emailAddress);
    }
}
