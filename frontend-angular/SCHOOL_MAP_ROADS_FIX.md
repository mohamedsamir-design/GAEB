# School Map Roads - Data Saving Issue Fixed

## Issue
Error when saving data in `http://localhost:4200/school-map-roads`

## Root Cause
The component was sending incorrect field names that didn't match the backend `SchoolRoad` model.

**Incorrect fields being sent:**
- `buildingCode` ❌
- `centerCode` ❌  
- `branchCode` ❌
- `mainRoadTypeCode` ❌
- `movementDirectionCode` ❌

**Expected fields by backend:**
- `buildingId` ✅
- `roadName` ✅
- `roadType` ✅
- `roadWidth` ✅
- `direction` ✅
- `condition` ✅

## Fix Applied

### 1. Updated Component TypeScript (`school-map-roads.ts`)

**Changed form fields:**
```typescript
// OLD
this.roadsForm = this.fb.group({
  buildingCode: ['', Validators.required],
  centerCode: ['', Validators.required],
  branchCode: ['', Validators.required],
  mainRoadTypeCode: ['', Validators.required],
  roadWidth: ['', [Validators.required, Validators.min(0)]],
  movementDirectionCode: ['', Validators.required]
});

// NEW
this.roadsForm = this.fb.group({
  buildingId: ['', Validators.required],
  roadName: ['', Validators.required],
  roadType: ['', Validators.required],
  roadWidth: ['', [Validators.required, Validators.min(0)]],
  direction: ['', Validators.required],
  condition: ['', Validators.required]
});
```

**Updated dropdown options:**
```typescript
// OLD
mainRoadTypes = [
  { code: '1', name: 'طريق سريع' },
  { code: '2', name: 'طريق رئيسي' },
  { code: '3', name: 'طريق فرعي' }
];

movementDirections = [
  { code: '1', name: 'اتجاه واحد' },
  { code: '2', name: 'اتجاهين' }
];

// NEW
mainRoadTypes = [
  { code: 'طريق سريع', name: 'طريق سريع' },
  { code: 'طريق رئيسي', name: 'طريق رئيسي' },
  { code: 'طريق فرعي', name: 'طريق فرعي' }
];

movementDirections = [
  { code: 'شمال', name: 'شمال' },
  { code: 'جنوب', name: 'جنوب' },
  { code: 'شرق', name: 'شرق' },
  { code: 'غرب', name: 'غرب' }
];

// ADDED
roadConditions = [
  { code: 'ممتاز', name: 'ممتاز' },
  { code: 'جيد', name: 'جيد' },
  { code: 'مقبول', name: 'مقبول' },
  { code: 'يحتاج صيانة', name: 'يحتاج صيانة' }
];
```

**Updated onSubmit method:**
```typescript
const roadData = {
  buildingId: formData.buildingId,
  roadName: formData.roadName || '',
  roadType: formData.roadType,
  roadWidth: parseFloat(formData.roadWidth) || 0,
  direction: formData.direction,
  condition: formData.condition
};
```

### 2. Updated HTML Template (`school-map-roads.html`)

Replaced all form fields to match new structure:
- `buildingCode` → `buildingId` (معرف المبنى)
- Removed `centerCode` and `branchCode`
- Added `roadName` (اسم الطريق)
- `mainRoadTypeCode` → `roadType` (نوع الطريق)
- `movementDirectionCode` → `direction` (الاتجاه)
- Added `condition` (حالة الطريق)

## Backend Model (SchoolRoad.cs)

The backend model expects:
```csharp
public class SchoolRoad
{
    [Key]
    public Guid Id { get; set; }
    
    [ForeignKey("EducationalBuilding")]
    public Guid? EducationalBuildingId { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string BuildingId { get; set; } = string.Empty;
    
    [MaxLength(50)]
    public string? Direction { get; set; }
    
    [MaxLength(255)]
    public string? RoadName { get; set; }
    
    [Column(TypeName = "decimal(10,2)")]
    public decimal? RoadWidth { get; set; }
    
    [MaxLength(100)]
    public string? RoadType { get; set; }
    
    [MaxLength(50)]
    public string? Condition { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public EducationalBuilding? EducationalBuilding { get; set; }
}
```

## Testing

### API Test (Successful):
```powershell
POST http://localhost:5001/api/schoolmaps/roads
{
    "buildingId": "101234",
    "roadName": "طريق الاختبار",
    "roadType": "طريق رئيسي",
    "roadWidth": 12.5,
    "direction": "شمال",
    "condition": "جيد"
}

Response: 201 Created
{
    "id": "9d3ed429-b1c9-4bdb-a0f9-8dc3fe37a4a6",
    "buildingId": "101234",
    "roadName": "طريق الاختبار",
    "roadType": "طريق رئيسي",
    "roadWidth": 12.5,
    "direction": "شمال",
    "condition": "جيد",
    "createdAt": "2025-10-31T22:55:43.1271197Z"
}
```

### Database Verification:
```sql
SELECT TOP 1 Id, BuildingId, RoadName, RoadType, RoadWidth, Direction, Condition 
FROM SchoolRoads 
ORDER BY CreatedAt DESC

Result: Data saved successfully ✅
```

## Status
✅ **FIXED** - The school-map-roads component now correctly sends data that matches the backend model structure.

## How to Use
1. Navigate to `http://localhost:4200/school-map-roads`
2. Fill in the form:
   - **معرف المبنى** (Building ID): Enter a building GUID or code
   - **اسم الطريق** (Road Name): Enter road name
   - **عرض الطريق** (Road Width): Enter width in meters
   - **نوع الطريق** (Road Type): Select from dropdown
   - **الاتجاه** (Direction): Select direction
   - **حالة الطريق** (Condition): Select road condition
3. Click **حفظ البيانات** (Save Data)
4. Success message will appear: "تم حفظ بيانات الطرق بنجاح ✅"

## Notes
- The `buildingId` field expects the building identifier (can be a GUID or building code)
- All Arabic text is stored correctly in the database using NVARCHAR
- Form validation ensures all required fields are filled before submission
