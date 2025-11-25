namespace AngularProjectApi.Models;

public partial class LandTechnicalInspection
{
  public int Id { get; set; }

  public int LandCode { get; set; }

  public int GovernorateCode { get; set; }

  public string LandAddress { get; set; } = null!;

  public string LandOwnerName { get; set; } = null!;

  public string LandOwnerAddress { get; set; } = null!;

  public int TotalArea { get; set; }

  public string LandNature { get; set; } = null!;

  public int LandOwnershipCode { get; set; }

  public string? NorthernBoundary { get; set; }

  public int? NorthernBoundaryLength { get; set; }

  public string? SouthernBoundary { get; set; }

  public int? SouthernBoundaryLength { get; set; }

  public string? EasternBoundary { get; set; }

  public int? EasternBoundaryLength { get; set; }

  public string? WesternBoundary { get; set; }

  public int? WesternBoundaryLength { get; set; }

  public string? NortheastBoundary { get; set; }

  public int? NortheastBoundaryLength { get; set; }

  public string? NorthwestBoundary { get; set; }

  public int? NorthwestBoundaryLength { get; set; }

  public string? SoutheastBoundary { get; set; }

  public int? SoutheastBoundaryLength { get; set; }

  public string? SouthwestBoundary { get; set; }

  public int? SouthwestBoundaryLength { get; set; }

  public int? TechnicalResponsiblePersonId { get; set; }

  public int? LegalResponsiblePersonId { get; set; }

  public DateTime? NeedsCommitteeDate { get; set; }

  public DateTime? TechnicalInspectionDate { get; set; }
  public DateTime? CreatedAt { get; set; }
}
