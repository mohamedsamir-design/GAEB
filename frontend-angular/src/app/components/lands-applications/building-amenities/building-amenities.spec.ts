import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAmenities } from './building-amenities';

describe('BuildingAmenities', () => {
  let component: BuildingAmenities;
  let fixture: ComponentFixture<BuildingAmenities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingAmenities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingAmenities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
