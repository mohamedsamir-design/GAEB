using System.ComponentModel.DataAnnotations;

namespace AngularProjectApi.Models
{
  public class LandAndLegalConnection
  {
    [Key]
    public int Id { get; set; }
    public int LandId { get; set; }

    public int SchoolReferenceNumber { get; set; }
  }
}
