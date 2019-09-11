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
            return new DataResult<List<string>>(ImagesService.GetList(req).Select(i => i.FileName).ToList());
        }

        [HttpGet("")]
        [AllowAnonymous]
        public ActionResult GetImage(string name, bool thumb = true)
        {
            var path = Path.Combine(_host.WebRootPath, "storage/images", name);
            if (thumb)
            {
                var thumbStream = ImageUtil.CreateThumbnail(path);
                return File(thumbStream, "image/jpeg");
            }
            return PhysicalFile(path, "image/jpeg");
        }

        [HttpPost("add")]
        [Authorize(Policy = "UserBase")]
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
                    };
                    imageList.Add(image);
                }
                catch { }
            }

            return new MessageDataResult("Upload Image", ImagesService.SaveItems(imageList));
        }
    }
}