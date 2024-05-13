import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCygnusComponent } from './new-user-cygnus.component';

describe('NewUserCygnusComponent', () => {
  let component: NewUserCygnusComponent;
  let fixture: ComponentFixture<NewUserCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUserCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
