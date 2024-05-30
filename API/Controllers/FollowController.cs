using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

	public class FollowController : BaseAPIController
	{
		[HttpPost("{username}")]
		public async Task<IActionResult> Follow(string username)
		{
			return HandleResult(await Mediator.Send(new FollowToggle.Command
			{ TargetUsername = username }));
		}

		[HttpGet("{username}")]
		public async Task<IActionResult> GetFollowings(string username, string predicate) // username coem from route, predicate comes from query string
		{
			return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
		}
	}
}