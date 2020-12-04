using CoolTeacherDimon.Options;
using CoolTeacherDimon.Services.Abstration;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CoolTeacherDimon.Services.Implementation
{
    public class JwtService : IJwtService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly JwtOptions jwtOptions;

        public JwtService(UserManager<ApplicationUser> userManager, IOptions<JwtOptions> jwtOptions)
        {
            this.jwtOptions = jwtOptions.Value;
            this.userManager = userManager;
        }

        public async Task<string> CreateTokenAsync(ApplicationUser identityUser) 
        {
            var utcNow = DateTime.UtcNow;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtOptions.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = await SetClaims(identityUser),
                Expires = utcNow.AddHours(jwtOptions.ExpiryTimeInHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtOptions.Issuer,
                Audience = jwtOptions.Issuer,
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private async Task<ClaimsIdentity> SetClaims(ApplicationUser identityUser)
        {
            var roles = await userManager.GetRolesAsync(identityUser);

            var claims = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, identityUser.UserName),
                new Claim(ClaimTypes.Email, identityUser.Email),
                new Claim(ClaimTypes.NameIdentifier, identityUser.Id.ToString())
            });

            foreach (var role in roles)
            {
                claims.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }
    }
}