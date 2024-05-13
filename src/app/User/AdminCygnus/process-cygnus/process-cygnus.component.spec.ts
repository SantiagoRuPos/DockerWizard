import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCygnusComponent } from './process-cygnus.component';

describe('ProcessCygnusComponent', () => {
  let component: ProcessCygnusComponent;
  let fixture: ComponentFixture<ProcessCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
