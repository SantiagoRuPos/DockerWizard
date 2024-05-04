import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAutoDockerComponent } from './menu-auto-docker.component';

describe('MenuAutoDockerComponent', () => {
  let component: MenuAutoDockerComponent;
  let fixture: ComponentFixture<MenuAutoDockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAutoDockerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAutoDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
