using Application.Activities;
using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
      });

      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
                          {
                        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                      });
      });
      //registers all mediator handlers as the assembly is common to call of them 
      services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
      services.AddAutoMapper(typeof(MappingProfiles).Assembly); // used to map one type of object to another
      services.AddFluentValidationAutoValidation(); // used to validate data entries in asp pipeline
      services.AddValidatorsFromAssemblyContaining<Create>(); // causes asp to look for all validators within the dll the <create> validator is in, which is the dll all our validators will be in so finds them all


      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
      });
      return services;
    }
  }
}
