using mefapi.Dtos;
using mefapi.Models;

namespace mefapi.Interfaces
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAsync(Register user);
        Task<LoginResponse> SignInAsync(Login user);
        Task<LoginResponse> RefreshTokenAsync(RefreshToken token);
        Task<List<ManageUser>> GetUsers();
        Task<List<SystemRole>> GetRoles();
        Task<GeneralResponse> UpdateUser(ManageUser user);
        Task<GeneralResponse> DeleteUser(int id);
    }
}
