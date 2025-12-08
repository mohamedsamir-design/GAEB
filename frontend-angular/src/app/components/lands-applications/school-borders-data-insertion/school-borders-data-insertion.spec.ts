import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBordersDataInsertion } from './school-borders-data-insertion';

describe('SchoolBordersDataInsertion', () => {
  let component: SchoolBordersDataInsertion;
  let fixture: ComponentFixture<SchoolBordersDataInsertion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolBordersDataInsertion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolBordersDataInsertion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
