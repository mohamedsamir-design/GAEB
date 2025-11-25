using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LookupController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public LookupController(ApplicationDbContext context)
  {
    _context = context;
  }

  // GET: api/GetGovernorates
  [HttpGet("GetGovernorates")]
  public async Task<ActionResult<IEnumerable<Governorate>>> GetGovernorates()
  {
    return await _context.Governorates.AsNoTracking().OrderBy(l => l.Name).ToListAsync();
  }

  // GET: api/GetLandOwner
  [HttpGet("GetLandOwners")]
  public async Task<ActionResult<IEnumerable<LandOwner>>> GetLandOwners()
  {
    return await _context.LandOwner.AsNoTracking().OrderBy(l => l.Name).ToListAsync();
  }
}
