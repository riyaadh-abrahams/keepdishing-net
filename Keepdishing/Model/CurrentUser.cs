using System.ComponentModel.DataAnnotations;

namespace Keepdishing.Model
{
    public class CurrentUser
    {
        public CurrentUser(string UserName, string Email, bool EmailConfirmed)
        {
            this.UserName = UserName;
            this.Email = Email;
            this.EmailConfirmed = EmailConfirmed;
        }

        [Required]
        public string UserName { get; }

        [Required]
        public string Email { get; }

        [Required]
        public bool EmailConfirmed { get; }
    }
}
