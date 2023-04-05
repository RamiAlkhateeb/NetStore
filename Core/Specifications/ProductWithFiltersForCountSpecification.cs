using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams) : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Title.ToLower().Contains(productParams.Search)) &&
                (string.IsNullOrEmpty(productParams.Category) || x.Category == productParams.Category) &&
                (string.IsNullOrEmpty(productParams.Brand) || x.Brand == productParams.Brand)
            )
        {

        }
    }
}
