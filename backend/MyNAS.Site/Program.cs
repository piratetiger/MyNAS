using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyNAS.Service;

namespace MyNAS.Site
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var adminService=new AdminService();
            adminService.InitDB();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel(c => c.Listen(new System.Net.IPAddress(new byte[] { 0, 0, 0, 0 }), 5000))
                .UseStartup<Startup>();
    }
}
