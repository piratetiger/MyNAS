using System.Collections.Generic;
using System.Linq;
using MyNAS.Model;
using MyNAS.Model.Images;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class ImagesService
    {
        public List<ImageModel> GetList(GetListRequest req)
        {
            return LiteDBHelper.SearchItems<ImageModel>(Constants.TABLE_IMAGES, req);
        }

        public bool SaveItem(ImageModel item)
        {
            return LiteDBHelper.SaveItem(Constants.TABLE_IMAGES, item);
        }

        public bool SaveItems(List<ImageModel> items)
        {
            return LiteDBHelper.SaveItems(Constants.TABLE_IMAGES, items);
        }

        public bool DeleteItems(List<string> names)
        {
            if (names == null)
            {
                return false;
            }

            var deleteItems = names.Select(n => new ImageModel { FileName = n }).ToList();
            return LiteDBHelper.DeleteItems(Constants.TABLE_IMAGES, deleteItems);
        }
    }
}