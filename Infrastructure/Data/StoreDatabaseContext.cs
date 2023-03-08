using Core.Entities;
using Microsoft.EntityFrameworkCore;


namespace Infrastructue.Data
{
    public class StoreDatabaseContext : DbContext
    {
        public StoreDatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }   
    }
}
