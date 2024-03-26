using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Details
	{
		// defines a request of type "Details.Query" that can be sent to the mediator. The request contains value id that can be used by handler, returns a <Activity> 
		public class Query : IRequest<Result<Activity>>
		{
			public Guid Id { get; set; }
		}
		// defines how the meditator handles all requests of type "Details.Query"
		public class Handler : IRequestHandler<Query, Result<Activity>>
		{
			private readonly DataContext _dataContext;

			public Handler(DataContext dataContext)
			{
				_dataContext = dataContext;
			}
			public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
			{

				Activity activity = await _dataContext.Activities.FindAsync(request.Id);
				return Result<Activity>.Success(activity);
			}
		}
	}
}
