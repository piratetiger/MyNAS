using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model.Images;
using MyNAS.Service;
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

        protected ImagesService ImagesService
        {
            get
            {
                return new ImagesService();
            }
        }

        public ImagesController(IHostingEnvironment host)
        {
            _host = host;
        }

        [HttpPost("GetList")]
        public ActionResult<List<string>> GetList(GetListRequest req)
        {
            return ImagesService.GetList(req).Select(i=>i.FileName).ToList();
        }
    }
}