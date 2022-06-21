using Microsoft.AspNetCore.Identity;

namespace Keepdishing.Model.Idenitity
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
    } 
}
