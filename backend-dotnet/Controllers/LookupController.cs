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

    // GET: api/lookup/GetDistricts
    [HttpGet("GetDistricts")]
    public async Task<ActionResult<IEnumerable<District>>> GetDistricts()
    {
        return await _context.District.AsNoTracking().OrderBy(d => d.Number).ToListAsync();
    }

    // GET: api/lookup/GetVillagesByDistrict/{districtNumber}
    [HttpGet("GetVillagesByDistrict/{districtNumber}")]
    public async Task<ActionResult<IEnumerable<Village>>> GetVillagesByDistrict(int districtNumber)
    {
        // Get villages where the village number starts with the district number
        // For example, district 101 has villages 10101, 10102, 10103, etc.
        var villages = await _context.Villages
            .AsNoTracking()
            .Where(v => v.Number.ToString().StartsWith(districtNumber.ToString()))
            .OrderBy(v => v.Number)
            .ToListAsync();

        return villages;
    }

    // GET: api/lookup/GetVillagesContinue
    [HttpGet("GetVillagesContinue")]
    public async Task<ActionResult<IEnumerable<VillagesContinue>>> GetVillagesContinue()
    {
        return await _context.VillagesContinue.AsNoTracking().OrderBy(v => v.Number).ToListAsync();
    }
}
