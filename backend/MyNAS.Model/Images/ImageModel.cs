using System;

namespace MyNAS.Model.Images
{
    public class ImageModel : IDateModel
    {
        public string FileName { get; set; }
        public DateTime Date { get; set; }
    }
}