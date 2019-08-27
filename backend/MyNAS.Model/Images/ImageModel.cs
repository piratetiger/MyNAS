using System;

namespace MyNAS.Model.Images
{
    public class ImageModel : IDateModel
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public DateTime Date { get; set; }
        public bool IsPublic { get; set; }
        public string Owner { get; set; }
    }
}