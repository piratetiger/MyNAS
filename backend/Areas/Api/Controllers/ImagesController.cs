using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Site;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    [TypeFilter(typeof(CreateFolderAttribute), Arguments = new[] { "storage/images" })]
    public class ImagesController : ControllerBase
    {
        private readonly IHostingEnvironment _host;

        public ImagesController(IHostingEnvironment host)
        {
            _host = host;
        }

        [HttpGet("GetList")]
        public IActionResult GetList()
        {
            return Content("test");
        }
    }
}