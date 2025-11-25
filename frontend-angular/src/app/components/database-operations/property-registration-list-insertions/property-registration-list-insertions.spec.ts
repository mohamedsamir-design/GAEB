import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRegistrationListInsertions } from './property-registration-list-insertions';

describe('PropertyRegistrationListInsertions', () => {
  let component: PropertyRegistrationListInsertions;
  let fixture: ComponentFixture<PropertyRegistrationListInsertions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyRegistrationListInsertions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyRegistrationListInsertions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
