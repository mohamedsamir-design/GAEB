namespace AngularProjectApi.Models
{
    public class CreateBuildingAmenityResponse
    {
        public Guid BuildingId { get; set; }
        public int CreatedCount { get; set; }
        public int SkippedCount { get; set; }
        public List<Guid> CreatedAmenityIds { get; set; } = new List<Guid>();
        public List<Guid> SkippedAmenityIds { get; set; } = new List<Guid>();

    }
}
