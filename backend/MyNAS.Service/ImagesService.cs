using System.Collections.Generic;
using MyNAS.Model;
using MyNAS.Model.Images;

namespace MyNAS.Service
{
    public class ImagesService
    {
        public List<ImageModel> GetList(GetListRequest req)
        {
            return LiteDBHelper.GetItems<ImageModel>("images", req);
        }

        public bool SaveItem(ImageModel item)
        {
            return LiteDBHelper.SaveItem("images", item);
        }

        public bool SaveItems(List<ImageModel> items)
        {
            return LiteDBHelper.SaveItems("images", items);
        }
    }
}