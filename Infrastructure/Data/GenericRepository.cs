using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

//Repo Implementation
public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
{
    //injecting and implementing based on DB provider
    private StoreDatabaseContext _context = null;
    public GenericRepository(StoreDatabaseContext context)
    {
        _context = context;
    }
   
    public int SaveChanges() => _context.SaveChanges();

    public async Task<IReadOnlyList<TEntity>> ListAllAsync()
    {
        return await _context.Set<TEntity>().ToListAsync();
    }

    public async Task<TEntity> GetByIdAsync(int id)
    {
        return await _context.Set<TEntity>().FindAsync(id);
    }

    public async Task<TEntity> GetEntityWithSpec(ISpecification<TEntity> spec)
    {
        return await ApplySpecification(spec).FirstOrDefaultAsync();
    }

    public async Task<IReadOnlyList<TEntity>> ListAsync(ISpecification<TEntity> spec)
    {
        return await ApplySpecification(spec).ToListAsync();
    }

    private IQueryable<TEntity> ApplySpecification (ISpecification<TEntity> specification)
    {
        return SpecificationEvaluator<TEntity>.GetQuery(_context.Set<TEntity>().AsQueryable(), specification);
    }
}

// async implementation
// for the async implementation and injections the ctor of the main class should be used
// please avoid ctor overloading (use the main class ctor) 
//public partial class GenericRepository<TEntity>
//{
//    public async ValueTask AddAsync(TEntity entity)
//    {
//        await _table.AddAsync(entity);
//        /* TODO tracking if needed */
//        var oResult = await _table.AddAsync(entity);
//        oResult.State = EntityState.Added;
//        _context.Entry(oResult);
//    }
//    public async ValueTask<IEnumerable<TEntity>> GetAllAsync() => await _table.ToListAsync();
//    //public async ValueTask<TEntity> GetByIdAsync(int entityId) => await _table.FindAsync(entityId);
//    public async ValueTask DeleteAsync(int entityId)
//    {
//        TEntity entity = await _table.FindAsync(entityId);
//        _table.Remove(entity);
//        /* TODO tracking if needed */
//        var oResult = _table.Remove(entity);
//        oResult.State = EntityState.Deleted;
//        _context.Entry(entity);
//    }
//    public async ValueTask<int> SaveChangesAsync() => await _context.SaveChangesAsync();
//}
//public void Add(TEntity entity) => _table.Add(entity);
//public IEnumerable<TEntity> GetAll() => _table.ToList();
//public TEntity GetById(int entityId) => _table.Find(entityId);
//public void Update(TEntity entity) => _table.Attach(entity);
//public void Delete(int entityId)
//{
//    TEntity entity = _table.Find(entityId);
//    _table.Remove(entity);
//}

