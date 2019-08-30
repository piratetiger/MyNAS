using System;
using MyNAS.Model.Admin;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class AdminService
    {
        public string NewToken(UserModel user)
        {
            var dbUser = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, user.KeyName);

            if (dbUser != null)
            {
                var date = DateTime.Now;
                var token = GetToken(user, date);

                dbUser.HostName = user.HostName;
                dbUser.Token = token;
                dbUser.TokenDate = date;
                LiteDBHelper.UpdateItem(Constants.TABLE_USERS, dbUser);
                return token;
            }
            else
            {
                return null;
            }
        }

        public bool ValidateToken(UserModel user)
        {
            var dbUser = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, user.KeyName);

            if (dbUser != null)
            {
                var userToken = GetToken(user, dbUser.TokenDate);
                var dbUserToken = GetToken(dbUser, dbUser.TokenDate);

                if (userToken == user.Token && dbUserToken == dbUser.Token && userToken == dbUserToken && (DateTime.Now - dbUser.TokenDate) < TimeSpan.FromDays(7))
                {
                    return true;
                }
            }

            return false;
        }

        private string GetToken(UserModel user, DateTime tokenDate)
        {
            var key = $@"{user.HostName}\{user.UserName}";
            var data = $@"{tokenDate.ToString()}\{user.Password}";
            return EncryptHelper.Encrypt(data, key);
        }
    }
}