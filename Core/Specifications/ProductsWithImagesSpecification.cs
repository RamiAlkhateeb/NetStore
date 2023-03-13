using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductsWithImagesSpecification : BasedSpecification<Product>
    {
        public ProductsWithImagesSpecification()
        {
            AddInclude(x => x.ProductImages);
        }

        public ProductsWithImagesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductImages);
        }
    }
}
