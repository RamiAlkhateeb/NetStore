using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "John Doe",
                    Email = "john@test.com",
                    UserName = "john@test.com",
                    Address = new Address
                    {
                        FirstName = "John",
                        LastName = "Doe",
                        Street = "123 Main St",
                        Country = "United States",
                        City = "Anytown",
                        ZipCode = "12345",
                        AddressDiscription = "Home",
                        //AppUserId = "12345"
                    }
                };

                await userManager.CreateAsync(user , "Pa$$w0rd");

            }
        }
    }
}
