using Core.Entities;
using Core.Entities.OrderAggregate;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedData(StoreDatabaseContext context)
        {
            var path=Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);   
            if(!context.Products.Any())
            {
                var productsData = File.ReadAllText(path + @"/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                context.Products.AddRange(products);
            }

            if (!context.ProductImages.Any())
            {
                var Data = File.ReadAllText(path + @"/Data/SeedData/productsImages.json");
                var productsImges = JsonSerializer.Deserialize<List<ProductImage>>(Data);
                context.ProductImages.AddRange(productsImges);
            }

            if (!context.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText(path + @"/Data/SeedData/delivery.json");
                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                context.DeliveryMethods.AddRange(methods);
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}
