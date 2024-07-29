import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDockerComponent } from './new-docker.component';

describe('NewDockerComponent', () => {
  let component: NewDockerComponent;
  let fixture: ComponentFixture<NewDockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDockerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
