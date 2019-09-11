using System;
using System.Collections.Generic;
using MyNAS.Model.User;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class AdminService
    {
        public bool InitDB()
        {
            var admin = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, "admin");
            if (admin == null)
            {
                var users = new List<UserModel>();
                users.Add(new UserModel { UserName = "admin", Password = "Admin", Role = UserRole.SystemAdmin });
                return LiteDBHelper.SaveItems(Constants.TABLE_USERS, users);
            }
            else
            {
                return false;
            }
        }
    }
}