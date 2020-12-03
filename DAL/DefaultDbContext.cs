using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class DefaultDbContext : IdentityDbContext<ApplicationUser, IdentityRole<long>, long>
    {
        public DefaultDbContext(DbContextOptions<DefaultDbContext> options)
            :base(options)
        { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public DbSet<Product> Products { get; set; }
    }
}
