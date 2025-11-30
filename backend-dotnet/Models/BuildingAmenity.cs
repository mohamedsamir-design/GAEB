using System.ComponentModel.DataAnnotations;

namespace AngularProjectApi.Models
{
    public class BuildingAmenity
    {
        [Key]
        public Guid Id { get; set; }

        public Guid BuildingId { get; set; }

        public Guid AmenityId { get; set; }

        // Navigation properties
        public virtual Amenity Amenity { get; set; }

        public virtual Building Building { get; set; }

    }
}
