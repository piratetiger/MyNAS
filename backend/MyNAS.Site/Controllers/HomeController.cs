using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model.Admin;
using MyNAS.Service;
using MyNAS.Site.Helper;
using MyNAS.Site.Models;

namespace MyNAS.Site.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _host;

        protected AdminService AdminService
        {
            get
            {
                return new AdminService();
            }
        }

        public HomeController(IHostingEnvironment host)
        {
            _host = host;
        }

        public IActionResult Index()
        {
            return File("index.html", "text/html");
        }

        [HttpPost("login")]
        public ActionResult<string> Login([FromBody] LoginRequest req)
        {
            req.HostInfo = RequestHelper.GetUserAgent(HttpContext);
            return AdminService.Login(req);
        }

        public IActionResult List()
        {
            return Content(string.Join(Environment.NewLine, Directory.GetFiles(System.IO.Path.Combine(_host.WebRootPath))));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
