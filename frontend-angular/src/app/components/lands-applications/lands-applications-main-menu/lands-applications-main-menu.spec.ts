import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandsApplicationsMainMenu } from './lands-applications-main-menu';

describe('LandsApplicationsMainMenu', () => {
  let component: LandsApplicationsMainMenu;
  let fixture: ComponentFixture<LandsApplicationsMainMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandsApplicationsMainMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandsApplicationsMainMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
