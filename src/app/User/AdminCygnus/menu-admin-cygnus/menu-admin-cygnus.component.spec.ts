import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminCygnusComponent } from './menu-admin-cygnus.component';

describe('MenuAdminCygnusComponent', () => {
  let component: MenuAdminCygnusComponent;
  let fixture: ComponentFixture<MenuAdminCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAdminCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAdminCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
