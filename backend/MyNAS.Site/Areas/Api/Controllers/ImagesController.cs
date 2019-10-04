using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model;
using MyNAS.Model.Images;
using MyNAS.Service;
using MyNAS.Site;
using MyNAS.Util;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    [TypeFilter(typeof(CreateFolderAttribute), Arguments = new[] { "storage/images" })]
    [TypeFilter(typeof(CreateFolderAttribute), Arguments = new[] { "storage/tmp" })]
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

        [HttpPost("list")]
        public object GetImageList(GetListRequest req)
        {
            return new DataResult<List<ImageModel>>(ImagesService.GetList(req));
        }

        [HttpGet("")]
        [AllowAnonymous]
        public ActionResult GetImage(string name, bool thumb = true)
        {
            var path = Path.Combine(_host.WebRootPath, "storage/images", name);

            if (thumb)
            {
                var thumbPath = Path.Combine(_host.WebRootPath, "storage/tmp", name);
                if (!System.IO.File.Exists(thumbPath))
                {
                    using (var fileStream = System.IO.File.Create(thumbPath))
                    {
                        using (var thumbStream = ImageUtil.CreateThumbnail(path))
                        {
                            thumbStream.Seek(0, SeekOrigin.Begin);
                            thumbStream.CopyTo(fileStream);
                        }
                    }
                }
                return PhysicalFile(thumbPath, "image/jpeg");
            }
            else
            {
                return PhysicalFile(path, "image/jpeg");
            }
        }

        [HttpPost("add")]
        [Authorize(Policy = "UserBase")]
        [RequestFormLimits(MultipartBodyLengthLimit = 73400320)]
        [RequestSizeLimit(73400320)]
        public object UploadImage(IEnumerable<IFormFile> files, [FromForm] string date)
        {
            var imageList = new List<ImageModel>();
            foreach (var file in files)
            {
                try
                {
                    var imageDate = string.IsNullOrEmpty(date) ? DateTime.Now : DateTime.ParseExact(date, "yyyyMMdd", null);
                    var fileName = $"{imageDate.ToString("yyyyMMdd")}_{Guid.NewGuid().ToString()}.jpg";
                    var path = Path.Combine(_host.WebRootPath, "storage/images", fileName);
                    using (var fileStream = System.IO.File.Create(path))
                    {
                        using (var requestFileStream = file.OpenReadStream())
                        {
                            requestFileStream.Seek(0, SeekOrigin.Begin);
                            requestFileStream.CopyTo(fileStream);
                        }
                    }

                    var image = new ImageModel()
                    {
                        FileName = fileName,
                        Date = imageDate,
                        IsPublic = true,
                        Owner = User.Identity.Name
                    };
                    imageList.Add(image);
                }
                catch { }
            }

            return new MessageDataResult("Upload Image", ImagesService.SaveItems(imageList));
        }

        [HttpPost("delete")]
        [Authorize(Policy = "DataAdminBase")]
        public object DeleteVideo(DeleteRequest req)
        {
            foreach (var name in req.Names)
            {
                var path = Path.Combine(_host.WebRootPath, "storage/images", name);
                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
            }

            return new MessageDataResult("Delete Video", ImagesService.DeleteItems(req.Names));
        }
    }
}