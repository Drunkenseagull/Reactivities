using MediatR;
using Domain;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // this updates the entity that EF is tracking, but doesn't in itself cause a DB write
                _dataContext.Add(request.Activity);

                // this causes the entities to actually be written to the db
                await _dataContext.SaveChangesAsync();
            }
        }
    }
}
