using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model;
using MyNAS.Model.Videos;
using MyNAS.Service;
using MyNAS.Site;
using MyNAS.Util;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    [TypeFilter(typeof(CreateFolderAttribute), Arguments = new[] { "storage/videos" })]
    public class VideosController : ControllerBase
    {
        private readonly IHostingEnvironment _host;

        protected VideosService VideosService
        {
            get
            {
                return new VideosService();
            }
        }

        public VideosController(IHostingEnvironment host)
        {
            _host = host;
        }

        [HttpPost("list")]
        public object GetVideoList(GetListRequest req)
        {
            return new DataResult<List<VideoModel>>(VideosService.GetList(req));
        }

        [HttpGet("")]
        [AllowAnonymous]
        public ActionResult GetVideo(string name, bool thumb = true)
        {
            var path = Path.Combine(_host.WebRootPath, "storage/videos", name);
            if (thumb)
            {
                var file = new FileInfo(path);
                if (file.Exists)
                {
                    var thumbFile = file.FullName.Replace(file.Extension, ".jpg");

                    if (System.IO.File.Exists(thumbFile))
                    {
                        return PhysicalFile(thumbFile, "image/jpeg");
                    }
                }

                var defaultThumb = Path.Combine(_host.WebRootPath, "MP4thumb.jpg");
                return PhysicalFile(defaultThumb, "image/jpeg");
            }
            return PhysicalFile(path, "video/mp4");
        }

        [HttpPost("add")]
        [Authorize(Policy = "UserBase")]
        public object UploadVideo(IEnumerable<IFormFile> files, [FromForm] string date)
        {
            var videoList = new List<VideoModel>();
            foreach (var file in files)
            {
                try
                {
                    var videoDate = string.IsNullOrEmpty(date) ? DateTime.Now : DateTime.ParseExact(date, "yyyyMMdd", null);
                    var fileName = $"{videoDate.ToString("yyyyMMdd")}_{Guid.NewGuid().ToString()}.mp4";
                    var path = Path.Combine(_host.WebRootPath, "storage/videos", fileName);
                    using (var fileStream = System.IO.File.Create(path))
                    {
                        using (var requestFileStream = file.OpenReadStream())
                        {
                            requestFileStream.Seek(0, SeekOrigin.Begin);
                            requestFileStream.CopyTo(fileStream);
                        }
                    }

                    VideoUtil.CreateThumbnail(path);

                    var video = new VideoModel()
                    {
                        FileName = fileName,
                        Date = videoDate,
                        IsPublic = true,
                        Owner = User.Identity.Name
                    };
                    videoList.Add(video);
                }
                catch { }
            }

            return new MessageDataResult("Upload Video", VideosService.SaveItems(videoList));
        }
    }
}