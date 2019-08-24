using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    public class ImagesController : Controller
    {
        private readonly IHostingEnvironment _host;

        public ImagesController(IHostingEnvironment host)
        {
            _host = host;
        }

        public IActionResult test()
        {
            return Content("test");
        }
    }
}