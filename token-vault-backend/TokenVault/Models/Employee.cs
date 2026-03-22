namespace TokenVault.Models
{
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string NIC { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string ProfilePicture { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;

        // Navigation
        public Log? Log { get; set; }
    }
}