﻿using Microsoft.AspNetCore.Identity;

namespace DAL.Models
{
    public class ApplicationUser: IdentityUser<long>
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
    }
}