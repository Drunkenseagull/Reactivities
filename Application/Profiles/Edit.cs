using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
	public class Edit
	{
		public class Command : IRequest<Result<Unit>>
		{
			public string DisplayName { get; set; }
			public string Bio { get; set; }
		}

		public class CommandValidator : AbstractValidator<Command>
		{
			public CommandValidator()
			{
				RuleFor(x => x.DisplayName).NotEmpty();
			}
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly DataContext _dataContext;
			private readonly IMapper _mapper;
			private readonly IUserAccessor _userAccessor;

			public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
			{
				_dataContext = dataContext;
				_mapper = mapper;
				_userAccessor = userAccessor;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

				if (user == null) return null;

				user.DisplayName = request.DisplayName;
				user.Bio = request.Bio ?? user.Bio;

				var success = await _dataContext.SaveChangesAsync() > 0;
				if (success) return Result<Unit>.Success(Unit.Value);
				return Result<Unit>.Failure("Problem updating profile");
			}
		}
	}
}