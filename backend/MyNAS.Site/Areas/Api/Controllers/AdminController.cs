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

        [HttpPost("initDB")]
        public ActionResult<bool> InitDB()
        {
            return AdminService.InitDB();
        }
    }
}