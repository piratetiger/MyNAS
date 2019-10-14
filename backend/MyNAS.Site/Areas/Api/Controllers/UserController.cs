using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model;
using MyNAS.Model.User;
using MyNAS.Service;
using MyNAS.Site.Helper;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    public class UserController : ControllerBase
    {
        protected UserService UserService
        {
            get
            {
                return new UserService();
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public object Login(LoginRequest req)
        {
            req.HostInfo = RequestHelper.GetUserAgent(HttpContext);
            var user = UserService.Login(req);
            return new MessageDataResult<UserModel>("Login", user != null, user);
        }

        [HttpPost("update")]
        [AllowAnonymous]
        public object UpdateUser(UserRequest req)
        {
            UserModel user = null;

            if (req.User != null)
            {
                user = UserService.GetItem(req.User.UserName);

                if (user != null)
                {
                    user.NickName = req.User.NickName;
                }

                if (!string.IsNullOrEmpty(req.Password))
                {
                    if (req.OldPassword == user.Password)
                    {
                        user.Password = req.Password;
                    }
                    else
                    {
                        return new MessageDataResult("Update User", false);
                    }
                }
            }
            return new MessageDataResult("Update User", UserService.UpdateItem(user));
        }
    }
}