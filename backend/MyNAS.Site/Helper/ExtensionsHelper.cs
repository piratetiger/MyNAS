using System;
using Microsoft.AspNetCore.Authentication;

namespace MyNAS.Site.Helper
{
    public static class ExtensionsHelper
    {
        public static AuthenticationBuilder AddMyNASAuth(this AuthenticationBuilder builder, Action<MyNASAuthOptions> configOptions)
        {
            return builder.AddScheme<MyNASAuthOptions, MyNASAuthHandler>(MyNASAuthOptions.DefaultScheme, configOptions);
        }
    }
}