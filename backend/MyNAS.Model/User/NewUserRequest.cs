namespace MyNAS.Model.User
{
    public class NewUserRequest
    {
        public UserModel User { get; set; }
        public string Password { get; set; }
    }
}