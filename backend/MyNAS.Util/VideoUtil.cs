using System.IO;

namespace MyNAS.Util
{
    public static class VideoUtil
    {
        public static Stream CreateThumbnail(string path)
        {
            MemoryStream result = new MemoryStream();
            var ffMpeg = new NReco.VideoConverter.FFMpegConverter();
            ffMpeg.GetVideoThumbnail(path, result, 5);

            return result;
        }
    }
}