using TokenVault.Models;

namespace TokenVault.Data
{
    public static class DataSeeder
    {
        public static void Seed(AppDbContext context)
        {
            // If already has data → skip
            if (context.Logs.Any())
                return;

            // 🔹 Create Employees
            var emp1 = new Employee
            {
                Name = "Tharuka Dilshan",
                Address = "No 14, 1st Lane, Maharagama",
                NIC = "200204802312",
                Gender = "Male",
                Section = "Digital Platform",
                ProfilePicture = "https://res.cloudinary.com/dzoihiqlz/image/upload/v1752908874/tkryxe30svjoaonhmqnq.png"
            };

            var emp2 = new Employee
            {
                Name = "Nimali Perera",
                Address = "No 16, Main Road, Kandy",
                NIC = "200098765432",
                Gender = "Female",
                Section = "HR",
                ProfilePicture = "https://res.cloudinary.com/dzoihiqlz/image/upload/v1750741688/alxtde0q7arej0hqml1m.png"
            };

            context.Employees.AddRange(emp1, emp2);
            context.SaveChanges();

            // 🔹 Create Logs (Users)
            var log1 = new Log
            {
                Username = "tharuka",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                EmployeeId = emp1.Id
            };

            var log2 = new Log
            {
                Username = "nimali",
                Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                EmployeeId = emp2.Id
            };

            context.Logs.AddRange(log1, log2);
            context.SaveChanges();
        }
    }
}