import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringImagesComponent } from './monitoring-images.component';

describe('MonitoringImagesComponent', () => {
  let component: MonitoringImagesComponent;
  let fixture: ComponentFixture<MonitoringImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoringImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitoringImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
