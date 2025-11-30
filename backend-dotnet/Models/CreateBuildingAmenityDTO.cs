namespace AngularProjectApi.Models
{
    public class CreateBuildingAmenityDTO
    {
        public Guid BuildingId { get; set; }
        public List<Guid> AmenityIds { get; set; } = new List<Guid>();
    }
}
