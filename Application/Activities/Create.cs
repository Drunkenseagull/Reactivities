using MediatR;
using Domain;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
	public class Create
	{
		public class Command : IRequest<Result<Unit>>
		{
			public Activity Activity { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
			}
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly DataContext _dataContext;

			public Handler(DataContext dataContext)
			{
				_dataContext = dataContext;
			}
			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				// this updates the entity that EF is tracking, but doesn't in itself cause a DB write
				_dataContext.Add(request.Activity);

				// this causes the entities to actually be written to the db. Returns number of successful records written
				var result = await _dataContext.SaveChangesAsync() > 0;

				if (!result) return Result<Unit>.Failure("Failed to create activity.");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
