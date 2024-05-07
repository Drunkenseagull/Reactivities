using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace API.SignalR
{
	public class ChatHub : Hub
	{
		private readonly IMediator _mediator;

		public ChatHub(IMediator mediator)
		{
			_mediator = mediator;
		}

		// client will invoke this method by its name using SignalR, doesn't use controller
		public async Task SendComment(Create.Command command)
		{
			var comment = await _mediator.Send(command);

			await Clients.Group(command.ActivityId.ToString())
					.SendAsync("ReceiveComment", comment.Value);
		}

		// singalR calls this when a client connects
		public override async Task OnConnectedAsync()
		{
			var httpContext = Context.GetHttpContext();
			var activityId = httpContext.Request.Query["activityId"];
			await Groups.AddToGroupAsync(Context.ConnectionId, activityId); //signalR automatically removes the connection ID from any groups on disconnect
			var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
			await Clients.Caller.SendAsync("LoadComments", result.Value);
		}
	}
}