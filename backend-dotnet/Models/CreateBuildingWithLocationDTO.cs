using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProjectApi.Models;

public class CreateBuildingWithLocationDTO
{
    [Required]
    [MaxLength(50)]
    public string BuildingNumber { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string BuildingName { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalArea { get; set; }

    [Required]
    public int VillagesContinueNumber { get; set; }

    [Required]
    public int LandOwnershipId { get; set; }

    [Required]
    public int DistrictNum { get; set; }

    [Required]
    public int VillageNum { get; set; }
}

