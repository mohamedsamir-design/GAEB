import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIntegrationWithLandSystem } from './map-integration-with-land-system';

describe('MapIntegrationWithLandSystem', () => {
  let component: MapIntegrationWithLandSystem;
  let fixture: ComponentFixture<MapIntegrationWithLandSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapIntegrationWithLandSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapIntegrationWithLandSystem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
