using System.ComponentModel.DataAnnotations;

namespace AngularProjectApi.Models
{
    public class Amenity
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
        public ICollection<BuildingAmenity> BuildingAmenities { get; set; } 
    }
}
