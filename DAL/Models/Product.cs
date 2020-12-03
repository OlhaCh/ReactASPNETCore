using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [StringLength(150)]
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }
    }
}