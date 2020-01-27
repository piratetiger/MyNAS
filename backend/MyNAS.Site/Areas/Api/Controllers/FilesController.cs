using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model;
using MyNAS.Model.Files;
using MyNAS.Site.BackendServices;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    [TypeFilter(typeof(CreateFolderAttribute), Arguments = new[] { "storage/files" })]
    [TypeFilter(typeof(CreateFolderAttribute), Arguments = new[] { "storage/files/downloads" })]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _host;
        private readonly ITorrentDownloadService _btService;

        public FilesController(IWebHostEnvironment host, ITorrentDownloadService btService)
        {
            _host = host;
            _btService = btService;
        }

        [HttpPost("addbttask")]
        public object AddBtTask(AddBtTaskRequest req)
        {
            var success = true;
            try
            {
                if (string.IsNullOrEmpty(req.SavePath))
                {
                    req.SavePath = Path.Combine(_host.WebRootPath, "storage/files/downloads");
                }
                else
                {
                    req.SavePath = Path.Combine(_host.WebRootPath, "storage/files", req.SavePath);
                }
                _btService.Enqueue(req.SavePath, req.TorrentPath);
            }
            catch
            {
                success = false;
            }

            return new MessageDataResult("Add Bt Task", success);
        }

        [HttpPost("status")]
        public object GetStatus()
        {
            return new DataResult<double[]>(_btService.Status());
        }
    }
}