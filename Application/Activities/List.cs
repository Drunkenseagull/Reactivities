using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    /// <summary>
    /// Query object used by handler to pass info about the request
    /// </summary>
    public class Query : IRequest<Result<List<ActivityDTO>>> { }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDTO>>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;

      //arg comes from DI
      public Handler(DataContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var activities = await _context.Activities
          .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return Result<List<ActivityDTO>>.Success(activities);
      }
    }
  }
}
