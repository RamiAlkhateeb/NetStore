using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        //Task<List<T>> GetAsync();
        //Task<T> GetByIdAsync(int id);
        //Task<T> CreateAsync(T entity);
        //Task<T> UpdateAsync(T entity);
        //Task<T> DeleteAsync(T entity);

        /**         * async methods         */
        ValueTask AddAsync(T entity);
        ValueTask<IEnumerable<T>> GetAllAsync();
        ValueTask<T> GetByIdAsync(int entityId);
        ValueTask DeleteAsync(int entityId);
        // for case of using Entity framework with Sql db
        ValueTask<int> SaveChangesAsync();
        /**         * non async methods         */
        void Add(T entity);
        IEnumerable<T> GetAll();
        T GetById(int entityId);
        void Update(T entity);
        void Delete(int entityId);
        //for case of using Entity framework with Sql db
        int SaveChanges();

}
}
