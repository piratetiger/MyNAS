using System.Collections.Generic;
using MyNAS.Model.Images;

namespace MyNAS.Service
{
    public class ImagesService
    {
        public List<ImageModel> GetList(GetListRequest req)
        {
            return LiteDBHelper.GetItems<ImageModel>("images", req);
        }
    }
}