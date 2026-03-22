namespace TokenVault.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }

        public string Token { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }

        public int LogId { get; set; }

        // Navigation
        public Log? Log { get; set; }
    }
}