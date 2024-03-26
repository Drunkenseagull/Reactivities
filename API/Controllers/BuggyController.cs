using System;
using System.Reflection.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
	public class BuggyController : BaseAPIController
	{
		[HttpGet("not-found")]
		public ActionResult GetNotFound()
		{
			return NotFound();
		}

		[HttpGet("bad-request")]
		public ActionResult GetBadRequest()
		{
			return BadRequest("This is a bad request");
		}

		[HttpGet("server-error")]
		public ActionResult GetServerError()
		{
			throw new Exception("This is a server error");
		}

		[HttpGet("unauthorised")]
		public ActionResult GetUnauthorised()
		{
			return Unauthorized();
		}
	}
}