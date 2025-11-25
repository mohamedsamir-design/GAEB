import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandDataLegalLink } from './land-data-legal-link';

describe('LandDataLegalLink', () => {
  let component: LandDataLegalLink;
  let fixture: ComponentFixture<LandDataLegalLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandDataLegalLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandDataLegalLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
