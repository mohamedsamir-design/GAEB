import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRegistrationList } from './property-registration-list';

describe('PropertyRegistrationList', () => {
  let component: PropertyRegistrationList;
  let fixture: ComponentFixture<PropertyRegistrationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyRegistrationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyRegistrationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
