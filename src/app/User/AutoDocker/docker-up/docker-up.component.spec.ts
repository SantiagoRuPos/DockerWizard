import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerUpComponent } from './docker-up.component';

describe('DockerUpComponent', () => {
  let component: DockerUpComponent;
  let fixture: ComponentFixture<DockerUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DockerUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DockerUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
