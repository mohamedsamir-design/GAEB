using AngularProjectApi.Models;
using AutoMapper;

namespace AngularProjectApi
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<LandTechnicalInspection, LandTechnicalInspectionDTO>().ReverseMap();
    }
  }
}
