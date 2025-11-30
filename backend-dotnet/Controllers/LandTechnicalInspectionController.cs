using AngularProjectApi.Data;
using AngularProjectApi.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularProjectApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LandTechnicalInspectionController : ControllerBase
{
  private readonly ApplicationDbContext _context;
  protected readonly IMapper _mapper;

  public LandTechnicalInspectionController(ApplicationDbContext context, IMapper mapper)
  {
    _context = context;
    _mapper = mapper;
  }

  // GET: api/lands
  [HttpGet]
  public async Task<ActionResult<IEnumerable<LandTechnicalInspection>>> GetAll()
  {
    return await _context.LandTechnicalInspection.OrderByDescending(l => l.CreatedAt).ToListAsync();
  }

  // GET: api/lands/{id}
  [HttpGet("{id}")]
  public async Task<ActionResult<LandTechnicalInspection>> Get(int id)
  {
    var landTechnicalInspection = await _context.LandTechnicalInspection.FindAsync(id);

    if (landTechnicalInspection == null)
    {
      return NotFound();
    }

    return landTechnicalInspection;
  }

  // GET: api/LandTechnicalInspection/{id}
  [HttpGet("GetByLandCode/{landCode}")]

  public async Task<ActionResult<LandTechnicalInspectionDTO>> GetByLandCode(int landCode)
  {
    var landTechnicalInspection = await _context.LandTechnicalInspection.FirstOrDefaultAsync(l => l.LandCode == landCode);

    if (landTechnicalInspection == null)
    {
      return NotFound();
    }

    LandTechnicalInspectionDTO landTechnicalInspectionDTO = _mapper.Map<LandTechnicalInspectionDTO>(landTechnicalInspection);

    var governorate = await _context.Governorates.SingleAsync(L => L.Id == landTechnicalInspection.GovernorateCode);
    landTechnicalInspectionDTO.Governorate = governorate.Name;

    var landOwner = await _context.LandOwner.SingleAsync(L => L.Id == landTechnicalInspection.GovernorateCode);
    landTechnicalInspectionDTO.LandOwnerShipName =  landOwner.Name;

    return landTechnicalInspectionDTO;
  }

  // POST: api
  [HttpPost]
  public async Task<ActionResult<LandTechnicalInspection>> Create(LandTechnicalInspection landTechnicalInspection)
  {
    landTechnicalInspection.CreatedAt = DateTime.Now;

    _context.LandTechnicalInspection.Add(landTechnicalInspection);

    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(Create), new { id = landTechnicalInspection.Id }, landTechnicalInspection);
  }
}
