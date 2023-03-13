using Core.Entities;
using Infrastructue.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedData(StoreDatabaseContext context)
        {
            if(!context.Products.Any())
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                context.AddRange(products);
            }

            if (!context.ProductImages.Any())
            {
                var Data = File.ReadAllText("../Infrastructure/Data/SeedData/productsImages.json");
                var productsImges = JsonSerializer.Deserialize<List<ProductImage>>(Data);
                context.AddRange(productsImges);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}
