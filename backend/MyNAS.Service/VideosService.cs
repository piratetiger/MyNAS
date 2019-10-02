using System.Collections.Generic;
using System.Linq;
using MyNAS.Model;
using MyNAS.Model.Videos;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class VideosService
    {
        public List<VideoModel> GetList(GetListRequest req)
        {
            return LiteDBHelper.SearchItems<VideoModel>(Constants.TABLE_VIDEOS, req);
        }

        public bool SaveItem(VideoModel item)
        {
            return LiteDBHelper.SaveItem(Constants.TABLE_VIDEOS, item);
        }

        public bool SaveItems(List<VideoModel> items)
        {
            return LiteDBHelper.SaveItems(Constants.TABLE_VIDEOS, items);
        }

        public bool DeleteItems(List<string> names)
        {
            if (names == null)
            {
                return false;
            }

            var deleteItems = names.Select(n => new VideoModel { FileName = n }).ToList();
            return LiteDBHelper.DeleteItems(Constants.TABLE_VIDEOS, deleteItems);
        }
    }
}