import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAutoDockerComponent } from './body-auto-docker.component';

describe('BodyAutoDockerComponent', () => {
  let component: BodyAutoDockerComponent;
  let fixture: ComponentFixture<BodyAutoDockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyAutoDockerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyAutoDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
