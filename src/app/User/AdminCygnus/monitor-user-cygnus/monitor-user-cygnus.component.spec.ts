import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorUserCygnusComponent } from './monitor-user-cygnus.component';

describe('MonitorUserCygnusComponent', () => {
  let component: MonitorUserCygnusComponent;
  let fixture: ComponentFixture<MonitorUserCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitorUserCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorUserCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
