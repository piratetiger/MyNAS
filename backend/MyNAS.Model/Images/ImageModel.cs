using System;

namespace MyNAS.Model.Images
{
    public class ImageModel : INASModel
    {
        [JsonIgnoreSerialization]
        public long Id { get; set; }
        [JsonIgnoreSerialization]
        public string KeyName
        {
            get
            {
                return FileName;
            }
        }
        public string FileName { get; set; }
        public DateTime Date { get; set; }
        public bool IsPublic { get; set; }
        public string Owner { get; set; }
    }
}