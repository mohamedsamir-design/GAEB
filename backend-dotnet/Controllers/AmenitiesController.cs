using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProjectApi.Data;
using AngularProjectApi.Models;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AmenitiesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AmenitiesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/amenities
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Amenity>>> GetAllAmenities()
    {
        return await _context.Amenity
            .AsNoTracking()
            .Include(a => a.BuildingAmenities) // <-- Load related data
            .OrderByDescending(a => a.Id)
            .ToListAsync();
    }

    // GET: api/amenities/by-building/{buildingId}
    [HttpGet("by-building/{buildingId:guid}")]
    public async Task<ActionResult<IEnumerable<Amenity>>> GetAmenitiesByBuildingId(Guid buildingId)
    {
        var amenities = await _context.Amenity
            .AsNoTracking()
            .Include(a => a.BuildingAmenities) // <-- Load related data
            .Where(a => a.BuildingAmenities.Any(ba => ba.BuildingId == buildingId))
            .ToListAsync();

        if (!amenities.Any())
        {
            return NotFound($"No amenities found for building {buildingId}");
        }

        return Ok(amenities);
    }
    // POST: api/amenities/create-building-amenity
    [HttpPost("create-building-amenity")]
    public async Task<ActionResult<CreateBuildingAmenityResponse>> CreateBuildingAmenity([FromBody] CreateBuildingAmenityDTO request)
    {
        // Validate request
        if (request.AmenityIds == null || request.AmenityIds.Count == 0)
        {
            return BadRequest("At least one amenity ID is required");
        }

        // Validate that the building exists
        var building = await _context.Buildings.FindAsync(request.BuildingId);
        if (building == null)
        {
            return NotFound($"Building with id {request.BuildingId} not found");
        }

        // Remove duplicates from amenity IDs
        var uniqueAmenityIds = request.AmenityIds.Distinct().ToList();

        // Validate that all amenities exist
        var existingAmenities = await _context.Amenity
            .Where(a => uniqueAmenityIds.Contains(a.Id))
            .Select(a => a.Id)
            .ToListAsync();

        var missingAmenityIds = uniqueAmenityIds.Except(existingAmenities).ToList();
        if (missingAmenityIds.Any())
        {
            return NotFound($"The following amenity IDs were not found: {string.Join(", ", missingAmenityIds)}");
        }

        // Get existing relationships to avoid duplicates
        var existingRelationships = await _context.BuildingAmenity
            .Where(ba => ba.BuildingId == request.BuildingId && uniqueAmenityIds.Contains(ba.AmenityId))
            .Select(ba => ba.AmenityId)
            .ToListAsync();

        // Filter out amenities that already have relationships
        var newAmenityIds = uniqueAmenityIds.Except(existingRelationships).ToList();

        if (!newAmenityIds.Any())
        {
            return Conflict($"All amenities are already associated with building {request.BuildingId}");
        }

        // Create new building amenity relationships
        var buildingAmenities = newAmenityIds.Select(amenityId => new BuildingAmenity
        {
            Id = Guid.NewGuid(),
            BuildingId = request.BuildingId,
            AmenityId = amenityId
        }).ToList();

        _context.BuildingAmenity.AddRange(buildingAmenities);
        await _context.SaveChangesAsync();

        var response = new CreateBuildingAmenityResponse
        {
            BuildingId = request.BuildingId,
            CreatedCount = buildingAmenities.Count,
            SkippedCount = existingRelationships.Count,
            CreatedAmenityIds = buildingAmenities.Select(ba => ba.AmenityId).ToList(),
            SkippedAmenityIds = existingRelationships.ToList()
        };

        return CreatedAtAction(
            nameof(GetAmenitiesByBuildingId),
            new { buildingId = request.BuildingId },
            response);
    }

}