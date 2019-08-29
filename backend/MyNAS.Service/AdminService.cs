using System;
using MyNAS.Model.Admin;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class AdminService
    {
        public string GenerateToken(UserModel user)
        {
            var dbUser = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, user.KeyName);

            if (dbUser != null)
            {
                var key = $@"{user.HostName}\{user.UserName}";
                var token = EncryptHelper.Encrypt(key);

                dbUser.Token = token;
                dbUser.TokenDate = DateTime.Now;
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
                var userKey = $@"{user.HostName}\{user.UserName}";
                var tokenKey = EncryptHelper.Decrypt(dbUser.Token);

                if (userKey == tokenKey && (DateTime.Now - dbUser.TokenDate) < TimeSpan.FromDays(7))
                {
                    return true;
                }
            }

            return false;
        }
    }
}