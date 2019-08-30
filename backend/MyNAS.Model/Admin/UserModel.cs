using System;

namespace MyNAS.Model.Admin
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
        public string HostName { get; set; }
        public string Token { get; set; }
        public DateTime TokenDate { get; set; }
    }
}