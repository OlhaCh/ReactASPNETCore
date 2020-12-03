using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoolTeacherDimon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoolTeacherDimon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet("get-all")]
        [ProducesResponseType(typeof(List<ProductModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ProductModel>>> GetProducts()
        {
            try
            {
                var list = new List<ProductModel>();

                list.Add(new ProductModel { Id = 1, Name = "Salo", Price = 99 });
                list.Add(new ProductModel { Id = 2, Name = "Mnieso", Price = 110 });
                list.Add(new ProductModel { Id = 3, Name = "Maslo", Price = 70 });

                return list;
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult("error");
            }
        }
    }
}
