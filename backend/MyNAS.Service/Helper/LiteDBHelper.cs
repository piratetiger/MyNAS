using System.Collections.Generic;
using System.Linq;
using LiteDB;
using MyNAS.Model;

namespace MyNAS.Service
{
    public static class LiteDBHelper
    {
        public const string DB_FILE_NAME = "db_files/MyNAS.db";

        public static List<T> GetAll<T>(string name) where T : IKeyNameModel
        {
            using (var db = new LiteDatabase(DB_FILE_NAME))
            {
                var collection = db.GetCollection<T>(name);
                return collection.FindAll().ToList();
            }
        }

        public static List<T> SearchItems<T>(string name, IDateFilterRequest req) where T : INASModel
        {
            using (var db = new LiteDatabase(DB_FILE_NAME))
            {
                var collection = db.GetCollection<T>(name);
                return collection.Find(i => (i.Date >= req.StartDate) && (i.Date <= req.EndDate.AddDays(1)))
                            .OrderByDescending(i => i.Date)
                            .ToList();
            }
        }

        public static bool SaveItem<T>(string name, T item) where T : IKeyNameModel
        {
            if (item == null)
            {
                return false;
            }

            try
            {
                using (var db = new LiteDatabase(DB_FILE_NAME))
                {
                    var collection = db.GetCollection<T>(name);
                    var checkItem = collection.Find(i => i.KeyName == item.KeyName);
                    if (checkItem != null)
                    {
                        return false;
                    }
                    collection.Insert(item);
                    collection.EnsureIndex(i => i.KeyName);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static bool SaveItems<T>(string name, List<T> items) where T : IKeyNameModel
        {
            if (items == null)
            {
                return false;
            }

            try
            {
                using (var db = new LiteDatabase(DB_FILE_NAME))
                {
                    var collection = db.GetCollection<T>(name);
                    var checkItem = collection.FindOne(i => items.Select(ii => ii.KeyName).Contains(i.KeyName));
                    if (checkItem != null)
                    {
                        return false;
                    }
                    collection.InsertBulk(items);
                    collection.EnsureIndex(i => i.KeyName);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static bool UpdateItem<T>(string name, T item) where T : IKeyNameModel
        {
            if (item == null)
            {
                return false;
            }

            try
            {
                using (var db = new LiteDatabase(DB_FILE_NAME))
                {
                    var collection = db.GetCollection<T>(name);
                    if (item.Id == 0)
                    {
                        var dbItem = collection.FindOne(i => i.KeyName == item.KeyName);
                        if (dbItem != null)
                        {
                            item.Id = dbItem.Id;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    collection.Update(item);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public static T GetItem<T>(string name, string keyName) where T : IKeyNameModel
        {
            if (string.IsNullOrEmpty(keyName))
            {
                return default(T);
            }
            try
            {
                using (var db = new LiteDatabase(DB_FILE_NAME))
                {
                    var collection = db.GetCollection<T>(name);
                    return collection.FindOne(i => i.KeyName == keyName);
                }
            }
            catch
            {
                return default(T);
            }
        }
    }
}