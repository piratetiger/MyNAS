using Microsoft.AspNetCore.Mvc.Filters;
using NLog;

namespace MyNAS.Site
{
    public class ErrorLogAttribute : ExceptionFilterAttribute
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

        public override void OnException(ExceptionContext context)
        {
            if (context.Exception != null)
            {
                Logger.Log(LogLevel.Error, context.Exception.Message);
            }

            base.OnException(context);
        }
    }
}