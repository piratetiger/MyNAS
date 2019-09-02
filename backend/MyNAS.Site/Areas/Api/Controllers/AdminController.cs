using Microsoft.AspNetCore.Mvc;
using MyNAS.Model.Admin;
using MyNAS.Service;

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
        public ActionResult<string> Login(LoginRequest req)
        {
            req.HostInfo = HttpContext.Request.Host.Host;
            return AdminService.Login(req);
        }
    }
}