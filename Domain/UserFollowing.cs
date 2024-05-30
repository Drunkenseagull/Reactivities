namespace Domain
{
	public class UserFollowing
	{
		public string ObserverId { get; set; }
		public AppUser Observer { get; set; } // follower
		public string TargetId { get; set; }
		public AppUser Target { get; set; } // following
	}
}