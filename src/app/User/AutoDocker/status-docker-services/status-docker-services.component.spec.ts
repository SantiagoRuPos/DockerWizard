import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDockerServicesComponent } from './status-docker-services.component';

describe('StatusDockerServicesComponent', () => {
  let component: StatusDockerServicesComponent;
  let fixture: ComponentFixture<StatusDockerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusDockerServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusDockerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
