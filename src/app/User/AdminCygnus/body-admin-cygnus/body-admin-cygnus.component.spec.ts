import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAdminCygnusComponent } from './body-admin-cygnus.component';

describe('BodyAdminCygnusComponent', () => {
  let component: BodyAdminCygnusComponent;
  let fixture: ComponentFixture<BodyAdminCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyAdminCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyAdminCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
