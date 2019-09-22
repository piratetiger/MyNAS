using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyNAS.Model;
using MyNAS.Model.User;
using MyNAS.Service;

namespace MyNAS.Site.Areas.Api.Controllers
{
    [Area("Api")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Authorize(Policy = "Admin")]
    public class AdminController : ControllerBase
    {
        protected AdminService AdminService
        {
            get
            {
                return new AdminService();
            }
        }

        protected UserService UserService
        {
            get
            {
                return new UserService();
            }
        }

        [HttpPost("initDB")]
        [AllowAnonymous]
        public object InitDB()
        {
            return new MessageDataResult("Initialize database", AdminService.InitDB());
        }

        [HttpPost("users")]
        public object GetUserList()
        {
            return new DataResult<List<UserModel>>(UserService.GetList());
        }

        [HttpPost("users/add")]
        public object AddUser(NewUserRequest req)
        {
            return new MessageDataResult("Create User", UserService.SaveItem(req.User));
        }
    }
}