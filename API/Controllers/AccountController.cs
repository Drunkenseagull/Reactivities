using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : BaseAPIController
  {
    private readonly UserManager<AppUser> _userManager;
    public AccountController(UserManager<AppUser> userManager)
    {
      _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
    {
      AppUser user = await _userManager.FindByEmailAsync(loginDto.Email);

      if (user == null) return Unauthorized();

      bool result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
      if (!result)
        return Unauthorized();

      return new UserDTO
      {
        DisplayName = user.DisplayName,
        Image = null,
        Token = "This will be token",
        Username = user.UserName
      };
    }
  }
}