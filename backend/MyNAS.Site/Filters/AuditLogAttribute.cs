using Microsoft.AspNetCore.Mvc.Filters;
using NLog;

namespace MyNAS.Site
{
    public class AuditLogAttribute : ActionFilterAttribute
    {
        private static Logger _logger;

        protected Logger Logger
        {
            get
            {
                if (_logger == null)
                {
                    var factory = NLog.Web.NLogBuilder.ConfigureNLog("nlog.config");
                    _logger = factory.GetCurrentClassLogger();
                }

                return _logger;
            }
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Logger.Log(LogLevel.Info, context.HttpContext.User.Identity.Name);
            base.OnActionExecuting(context);
        }
    }
}