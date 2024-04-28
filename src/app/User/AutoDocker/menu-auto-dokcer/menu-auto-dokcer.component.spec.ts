import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAutoDokcerComponent } from './menu-auto-dokcer.component';

describe('MenuAutoDokcerComponent', () => {
  let component: MenuAutoDokcerComponent;
  let fixture: ComponentFixture<MenuAutoDokcerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAutoDokcerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAutoDokcerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
