using Microsoft.AspNetCore.Mvc.Filters;
using NLog;

namespace MyNAS.Site
{
    public class AuditLogAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var args = context.ActionArguments;
            var logger = NLog.Web.NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            logger.Log(LogLevel.Info, args);
            base.OnActionExecuting(context);
        }
    }
}