using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductsWithImagesSpecification : BaseSpecification<Product>
    {
        public ProductsWithImagesSpecification(ProductSpecParams productParams)
            : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Title.ToLower().Contains(productParams.Search)) &&
                (string.IsNullOrEmpty(productParams.Category) || x.Category.Contains(productParams.Category)) &&
                (string.IsNullOrEmpty(productParams.Brand) || x.Brand == productParams.Brand)
            )
        {
            AddInclude(x => x.ProductImages);
            AddOrderBy(x => x.Title);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch(productParams.Sort)
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
