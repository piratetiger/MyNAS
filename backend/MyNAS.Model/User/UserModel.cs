using System;

namespace MyNAS.Model.User
{
    public class UserModel : IKeyNameModel
    {
        public long Id { get; set; }
        public string KeyName
        {
            get
            {
                return UserName;
            }
        }
        public string UserName { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
        public string HostInfo { get; set; }
        public string Token { get; set; }
        public DateTime TokenDate { get; set; }
    }
}