using System.Collections.Generic;
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
    }
}