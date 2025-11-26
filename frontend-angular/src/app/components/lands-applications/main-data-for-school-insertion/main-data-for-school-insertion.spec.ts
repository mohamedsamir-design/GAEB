import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataForSchoolInsertion } from './main-data-for-school-insertion';

describe('MainDataForSchoolInsertion', () => {
  let component: MainDataForSchoolInsertion;
  let fixture: ComponentFixture<MainDataForSchoolInsertion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDataForSchoolInsertion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDataForSchoolInsertion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
