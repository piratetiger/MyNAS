using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model.Admin;
using MyNAS.Service;
using MyNAS.Site.Helper;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    public class AdminController : ControllerBase
    {
        protected AdminService AdminService
        {
            get
            {
                return new AdminService();
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult<string> Login(LoginRequest req)
        {
            req.HostInfo = RequestHelper.GetUserAgent(HttpContext);
            return AdminService.Login(req);
        }
    }
}