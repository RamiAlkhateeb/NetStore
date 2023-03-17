﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;


namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Creteria { get; }
        List<Expression<Func<T , object>>> Includes { get; }
        Expression<Func<T , object>> OrderBy { get; }
        Expression<Func<T , object>> OrderByDescending { get; }
        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }

    }
}