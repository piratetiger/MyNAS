using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Site.Models;

namespace MyNAS.Site.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _host;

        public HomeController(IHostingEnvironment host)
        {
            _host = host;
        }

        public IActionResult Index()
        {
            return File(System.IO.Path.Combine(_host.WebRootPath, "index.html"), "text/html");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
