using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security
{
	public class UserAccessor : IUserAccessor
	{
		private readonly IHttpContextAccessor _httpContextAccessor; // gives access to the http context outside the asp pipeline

		public UserAccessor(IHttpContextAccessor httpContextAccessor)
		{
			_httpContextAccessor = httpContextAccessor;
		}

		public string GetUsername()
		{
			return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
		}
	}
}
