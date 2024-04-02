using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class ActivitiesController : BaseAPIController
  {
    [HttpGet] // api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      return HandleResult(await Mediator.Send(new List.Query()));
    }

    [HttpGet("{id}")] // api/activities/{id}
    public async Task<IActionResult> GetActivity(Guid id)
    {
      return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }

    // [apicontroller] from super directs this function to look inside the body of the http request for objects that match the form of its parameters, if it finds any it uses them as arguments
    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
      return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
      activity.Id = id;
      return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}