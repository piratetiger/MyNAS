using System.Diagnostics;
using System.IO;

namespace MyNAS.Util
{
    public static class VideoUtil
    {
        public static void CreateThumbnail(string path)
        {
            var file = new FileInfo(path);
            if (file.Exists)
            {
                var output = file.FullName.Replace(file.Extension, ".jpg");
                var process = new Process();

                process.StartInfo = new ProcessStartInfo("ffmpeg")
                {
                    UseShellExecute = false,
                    CreateNoWindow = true,
                    Arguments = $"-i \"{path}\" -ss 1 -vframes 1 -r 1 -ac 1 -ab 2 -s 400*500 -f image2 \"{output}\"",
                };

                process.Start();
            }
        }
    }
}