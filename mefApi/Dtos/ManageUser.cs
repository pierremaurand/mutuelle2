namespace mefapi.Dtos
{
    public class ManageUser
    {
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
    }
}
