using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      // automapper can map params of the same name between types automatically. For different named values or if you want logic you need to specifiy the property mappings manually 
      CreateMap<Activity, Activity>();
      CreateMap<Activity, ActivityDTO>()
        // in formemeber, the first arg is a linq statement defining the target prop of the target type, the second arg is a collection of options for the target prop, including how to map a value to it
        .ForMember(dest => dest.HostUsername, options => options.MapFrom(source => source.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
      CreateMap<ActivityAttendee, AttendeeDTO>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
        .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
        .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
			  .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
			CreateMap<AppUser, Profiles.Profile>()
				.ForMember(d => d.Image, s => s.MapFrom(o => o.Photos.FirstOrDefault(x => x.IsMain).Url));
      CreateMap<Comment, CommentDTO>()
        .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
		}
  }
}
