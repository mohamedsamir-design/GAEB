import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseOperationsHome } from './database-operations-home';

describe('DatabaseOperationsHome', () => {
  let component: DatabaseOperationsHome;
  let fixture: ComponentFixture<DatabaseOperationsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseOperationsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseOperationsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
