import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandTechnicalInspectionComponent  } from './land-technical-inspection';

describe('LandDataInsertion', () => {
  let component: LandTechnicalInspectionComponent;
  let fixture: ComponentFixture<LandTechnicalInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandTechnicalInspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandTechnicalInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
