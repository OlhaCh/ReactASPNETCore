using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoolTeacherDimon.Services.Abstration
{
    public interface IJwtService
    {
        public Task<string> CreateTokenAsync(ApplicationUser identityUser);
    }
}
