using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TokenVault.Data;
using TokenVault.Models;
using TokenVault.Services;
using BCrypt.Net;

namespace TokenVault.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // =====================
        // Login API
        // =====================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Logs
                .Include(l => l.Employee)
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("Invalid username or password");

            // Generate Tokens
            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            // Save refresh token in DB
            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                LogId = user.Id
            };
            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Username = user.Username,
                EmployeeName = user.Employee?.Name,
                ProfilePicture = user.Employee?.ProfilePicture
            });
        }

        // =====================
        // Refresh Token API
        // =====================
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var token = await _context.RefreshTokens
                .Include(r => r.Log)
                .FirstOrDefaultAsync(t => t.Token == request.RefreshToken);

            if (token == null || token.ExpiryDate < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token");

            var newAccessToken = _tokenService.GenerateAccessToken(token.Log);

            return Ok(new
            {
                AccessToken = newAccessToken
            });
        }

        // =====================
        // Logout API
        // =====================
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] RefreshRequest request)
        {
            var token = await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == request.RefreshToken);

            if (token != null)
            {
                _context.RefreshTokens.Remove(token);
                await _context.SaveChangesAsync();
            }

            return Ok("Logged out successfully");
        }
    }

    // =====================
    // Request Models
    // =====================
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RefreshRequest
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}