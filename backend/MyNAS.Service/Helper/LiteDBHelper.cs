using System.Collections.Generic;
using System.Linq;
using LiteDB;
using MyNAS.Model;

namespace MyNAS.Service
{
    public static class LiteDBHelper
    {
        public const string DB_FILE_NAME = "db_files/MyNAS.db";

        public static List<T> GetItems<T>(string name, IDateFilterRequest req) where T : IDateModel
        {
            using (var db = new LiteDatabase(DB_FILE_NAME))
            {
                var items = db.GetCollection<T>(name);
                return items.Find(i => i.Date > req.StartDate && i.Date < req.EndDate)
                            .OrderByDescending(i => i.Date)
                            .ToList();
            }
        }
    }
}