namespace TokenVault.Models
{
    public class Log
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public int EmployeeId { get; set; }

        // Navigation
        public Employee? Employee { get; set; }
        public ICollection<RefreshToken>? RefreshTokens { get; set; }
    }
}