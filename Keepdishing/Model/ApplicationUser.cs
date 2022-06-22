using Microsoft.AspNetCore.Identity;

namespace Keepdishing.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
    }
}
