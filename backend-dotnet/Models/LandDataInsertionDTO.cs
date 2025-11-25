namespace AngularProjectApi.Models
{
  public class LandDataInsertionDTO
  {
    public Guid? Id { get; set; }
    public string? LandCode { get; set; }
    public int GovernorateCode { get; set; }
    public string? LandAddress { get; set; }
    public string? OwnerName { get; set; }
    public string? OwnerAddress { get; set; }
    public int TotalArea { get; set; }
    public string? LandNature { get; set; }
    public int OwnershipCode { get; set; }

    // الحدود
    public string? North { get; set; }
    public string? South { get; set; }
    public string? East { get; set; }
    public string? West { get; set; }

    // الأطوال
    public int LengthNorth { get; set; }
    public int LengthSouth { get; set; }
    public int LengthEast { get; set; }
    public int LengthWest { get; set; }

    // الزوايا
    public string? Ne { get; set; }
    public string? Nw { get; set; }
    public string? Se { get; set; }
    public string? Sw { get; set; }

    // أطوال الزوايا
    public int LengthNe { get; set; }
    public int LengthNw { get; set; }
    public int LengthSe { get; set; }
    public int LengthSw { get; set; }

    public string? TechnicalResponsible { get; set; }
    public string? LegalResponsible { get; set; }
    public DateTime InspectionDate { get; set; }
    public DateTime CommitteeDate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

  }
}
