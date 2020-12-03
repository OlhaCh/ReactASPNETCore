using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoolTeacherDimon.Models
{
    /// <summary>
    /// Represents product
    /// </summary>
    public class ProductModel
    {
        /// <summary>
        /// Set or get product Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Set or get product name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Set or get product price
        /// </summary>
        public decimal Price { get; set; }
    }
}
