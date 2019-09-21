using System;
using System.Collections.Generic;
using MyNAS.Model.User;
using MyNAS.Service.Helper;

namespace MyNAS.Service
{
    public class UserService
    {
        public UserModel Login(LoginRequest req)
        {
            if (string.IsNullOrEmpty(req.HostInfo))
            {
                return null;
            }

            var dbUser = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, req.UserName);

            if (dbUser != null && dbUser.Password == req.Password)
            {
                dbUser.HostInfo = req.HostInfo;
                dbUser.Token = NewToken(dbUser);
                return dbUser;
            }

            return null;
        }

        public bool ValidateUser(UserModel user)
        {
            var dbUser = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, user.KeyName);

            if (dbUser != null)
            {
                user.Password = dbUser.Password;
                user.TokenDate = dbUser.TokenDate;
                var userToken = GetToken(user);
                var dbUserToken = GetToken(dbUser);

                if (userToken == user.Token && dbUserToken == dbUser.Token && userToken == dbUserToken && (DateTime.Now - dbUser.TokenDate) < TimeSpan.FromDays(7))
                {
                    user.Role = dbUser.Role;
                    return true;
                }
            }

            return false;
        }

        public string NewToken(UserModel user)
        {
            var dbUser = LiteDBHelper.GetItem<UserModel>(Constants.TABLE_USERS, user.KeyName);

            if (dbUser != null)
            {
                var date = DateTime.Now;
                user.TokenDate = date;
                var token = GetToken(user);

                dbUser.HostInfo = user.HostInfo;
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

        public List<UserModel> GetList()
        {
            return LiteDBHelper.GetAll<UserModel>(Constants.TABLE_USERS);
        }

        private string GetToken(UserModel user)
        {
            var key = $@"{user.HostInfo}\{user.UserName}";
            var data = $@"{user.TokenDate.ToString()}\{user.Password}";
            return EncryptHelper.Encrypt(data, key);
        }
    }
}