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
                var collection = db.GetCollection<T>(name);
                return collection.Find(i => (i.Date >= req.StartDate) && (i.Date <= req.EndDate.AddDays(1)))
                            .OrderByDescending(i => i.Date)
                            .ToList();
            }
        }

        public static bool SaveItem<T>(string name, T item) where T : INASModel
        {
            try
            {
                using (var db = new LiteDatabase(DB_FILE_NAME))
                {
                    var collection = db.GetCollection<T>(name);
                    collection.Insert(item);
                    collection.EnsureIndex(i => i.FileName);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static bool SaveItems<T>(string name, List<T> items) where T : INASModel
        {
            try
            {
                using (var db = new LiteDatabase(DB_FILE_NAME))
                {
                    var collection = db.GetCollection<T>(name);
                    collection.InsertBulk(items);
                    collection.EnsureIndex(i => i.FileName);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}