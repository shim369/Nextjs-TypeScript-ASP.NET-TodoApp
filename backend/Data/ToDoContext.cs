using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ToDoContext : DbContext
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        { }
    }
}