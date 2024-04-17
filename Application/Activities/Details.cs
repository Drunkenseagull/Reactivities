using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
	public class Details
	{
		// defines a request of type "Details.Query" that can be sent to the mediator. The request contains value id that can be used by handler, returns a <Activity> 
		public class Query : IRequest<Result<ActivityDTO>>
		{
			public Guid Id { get; set; }
		}
		// defines how the meditator handles all requests of type "Details.Query"
		public class Handler : IRequestHandler<Query, Result<ActivityDTO>>
		{
			private readonly DataContext _dataContext;
      private readonly IMapper _mapper;

			public Handler(DataContext dataContext, IMapper mapper)
			{
				_dataContext = dataContext;
        _mapper = mapper;
			}
			public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
			{

				var activity = await _dataContext.Activities
          .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(x => x.Id == request.Id);

				return Result<ActivityDTO>.Success(activity);
			}
		}
	}
}
