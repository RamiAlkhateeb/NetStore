using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetByIdAsync(int id);

        Task<T> GetEntityWithSpec(ISpecification<T> spec);

        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        //Task<T> CreateAsync(T entity);
        //Task<T> UpdateAsync(T entity);
        //Task<T> DeleteAsync(T entity);

        /**         * async methods         */
        //ValueTask AddAsync(T entity);
        //ValueTask<IEnumerable<T>> GetAllAsync();
        ////ValueTask<T> GetByIdAsync(int entityId);
        //ValueTask DeleteAsync(int entityId);
        //// for case of using Entity framework with Sql db
        //ValueTask<int> SaveChangesAsync();

        ///**         * non async methods         */
        //void Add(T entity);
        //IEnumerable<T> GetAll();
        //T GetById(int entityId);
        //void Update(T entity);
        //void Delete(int entityId);
        ////for case of using Entity framework with Sql db
        //int SaveChanges();

}
}
