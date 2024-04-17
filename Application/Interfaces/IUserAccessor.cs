// interfaces in this folder are used to interact with other projects without creating dependencies

namespace Application.Interfaces
{
	public interface IUserAccessor
	{
		string GetUsername();
	}
}