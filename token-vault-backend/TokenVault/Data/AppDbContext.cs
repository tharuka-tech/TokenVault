using Microsoft.EntityFrameworkCore;
using TokenVault.Models;

namespace TokenVault.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // One-to-One: Log ↔ Employee
            modelBuilder.Entity<Log>()
                .HasOne(l => l.Employee)
                .WithOne(e => e.Log)
                .HasForeignKey<Log>(l => l.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-Many: Log → RefreshTokens
            modelBuilder.Entity<RefreshToken>()
                .HasOne(r => r.Log)
                .WithMany(l => l.RefreshTokens)
                .HasForeignKey(r => r.LogId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}