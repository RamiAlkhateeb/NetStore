using Core.Entities;
using Infrastructue.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreDatabaseContext _storeDatabaseContext;

        public ProductsController(StoreDatabaseContext storeDatabaseContext)
        {
            _storeDatabaseContext = storeDatabaseContext;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _storeDatabaseContext.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _storeDatabaseContext.Products.FindAsync(id);
        }
    }
}
