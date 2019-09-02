using Microsoft.AspNetCore.Http;

namespace MyNAS.Site.Helper
{
    public static class RequestHelper
    {
        public static string GetUserAgent(HttpContext httpContext)
        {
            if (httpContext == null)
            {
                return null;
            }

            return httpContext.Request.Headers["User-Agent"];
        }
    }
}