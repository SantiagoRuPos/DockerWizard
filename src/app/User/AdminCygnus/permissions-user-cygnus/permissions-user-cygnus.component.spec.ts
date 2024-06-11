import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsUserCygnusComponent } from './permissions-user-cygnus.component';

describe('PermissionsUserCygnusComponent', () => {
  let component: PermissionsUserCygnusComponent;
  let fixture: ComponentFixture<PermissionsUserCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionsUserCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionsUserCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
