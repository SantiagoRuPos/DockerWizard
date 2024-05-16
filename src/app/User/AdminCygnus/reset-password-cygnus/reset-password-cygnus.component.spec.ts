import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordCygnusComponent } from './reset-password-cygnus.component';

describe('ResetPasswordCygnusComponent', () => {
  let component: ResetPasswordCygnusComponent;
  let fixture: ComponentFixture<ResetPasswordCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetPasswordCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
