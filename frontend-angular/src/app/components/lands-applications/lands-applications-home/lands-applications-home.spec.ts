import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandsApplicationsHome } from './lands-applications-home';

describe('LandsApplicationsHome', () => {
  let component: LandsApplicationsHome;
  let fixture: ComponentFixture<LandsApplicationsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandsApplicationsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandsApplicationsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
