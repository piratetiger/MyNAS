namespace MyNAS.Model.Admin
{
    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string HostName { get; set; }
    }
}