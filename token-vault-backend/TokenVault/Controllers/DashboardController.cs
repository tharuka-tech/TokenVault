using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TokenVault.Data;

namespace TokenVault.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // All endpoints require JWT
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ 1️⃣ Get ALL employees (Requirement)
        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }

        // ✅ 2️⃣ Get ONLY logged-in user profile (Advanced)
        [HttpGet("my-profile")]
        public async Task<IActionResult> GetMyProfile()
        {
            try
            {
                // Get user ID from JWT token
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized("Invalid token");

                int id = int.Parse(userId);

                // Get user + employee details
                var user = await _context.Logs
                    .Where(l => l.Id == id)
                    .Select(l => new
                    {
                        l.Username,
                        Employee = new
                        {
                            l.Employee.Id,
                            l.Employee.Name,
                            l.Employee.Address,
                            l.Employee.NIC,
                            l.Employee.Gender,
                            l.Employee.Section,
                            l.Employee.ProfilePicture
                        }
                    })
                    .FirstOrDefaultAsync();

                if (user == null)
                    return NotFound("User not found");

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server error: " + ex.Message);
            }
        }
    }
}