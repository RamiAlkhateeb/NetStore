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
        public ProductsWithImagesSpecification(string sort)
        {
            AddInclude(x => x.ProductImages);
            AddOrderBy(x => x.Title);

            if (!string.IsNullOrEmpty(sort))
            {
                switch(sort)
                {
                    case "priceAsc": AddOrderBy(x => x.Price); break;
                    case "priceDesc": AddOrderByDescending(x => x.Price); break;
                    default: AddOrderBy(x => x.Title); break;
                }

                
            }
        }

        public ProductsWithImagesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductImages);
        }
    }
}
