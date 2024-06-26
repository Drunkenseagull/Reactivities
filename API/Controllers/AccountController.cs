﻿using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
  /// <summary>
  /// Everything to do with user registration and login.
  /// </summary>
  [ApiController]
  [Route("api/[controller]")] // values in [] are replaced with the controller name from the file, in this case Account, so route is baseroute/api/Account
  public class AccountController : BaseAPIController
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
      _userManager = userManager;
      _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
    {
      AppUser user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == loginDto.Email);

      if (user == null) return Unauthorized();

      bool result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
      if (!result)
        return Unauthorized();

      return new UserDTO
      {
        DisplayName = user.DisplayName,
        Image = null,
        Token = _tokenService.CreateToken(user),
        Username = user.UserName
      };
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
    {
      if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
      {
        ModelState.AddModelError("username", "Username is already taken.");
        return ValidationProblem();
      }

      if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
      {
				ModelState.AddModelError("email", "Email is already taken.");
        return ValidationProblem();
			}

      var user = new AppUser
      {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.Username
      };

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (result.Succeeded)
      {
        return CreateUserObject(user);
      }

      return BadRequest(result.Errors);
    }

    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
      var user = await _userManager.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

      return CreateUserObject(user);
    }

    private UserDTO CreateUserObject(AppUser user)
    {
      return new UserDTO
      {
        DisplayName = user.DisplayName,
        Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
        Token = _tokenService.CreateToken(user),
        Username = user.UserName
      };
    }
  }
}