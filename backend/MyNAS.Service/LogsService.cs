using System.Collections.Generic;
using MyNAS.Model.Logs;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class LogsService
    {
        protected LiteDBAccessor AuditLogAccessor
        {
            get
            {
                return new LiteDBAccessor("logs/AuditLog.db");
            }
        }

        public List<AuditLogModel> GetList(GetListRequest req)
        {
            return AuditLogAccessor.SearchItems<AuditLogModel>(Constants.TABLE_LOG_AUDIT, req);
        }
    }
}