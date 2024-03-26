using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
	public class Edit
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
			private readonly IMapper _mapper;

			public Handler(DataContext dataContext, IMapper mapper)
			{
				_dataContext = dataContext;
				_mapper = mapper;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				Console.WriteLine("1");
				var activity = await _dataContext.Activities.FindAsync(request.Activity.Id);

				if (activity == null) return null;

				// uses automapper to map all properties from our activity object that was interpreted from the http request into the activity entity from our app
				_mapper.Map(request.Activity, activity);

				var result = await _dataContext.SaveChangesAsync() > 0;
				Console.WriteLine(result);
				if (!result)
				{
					Console.WriteLine("2");
					return Result<Unit>.Failure("Failed to update activity.");
				}
				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
