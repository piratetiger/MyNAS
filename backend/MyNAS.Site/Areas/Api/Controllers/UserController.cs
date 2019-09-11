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
            var token = UserService.Login(req);
            return new MessageDataResult<string>("Login", !string.IsNullOrEmpty(token), token);
        }
    }
}