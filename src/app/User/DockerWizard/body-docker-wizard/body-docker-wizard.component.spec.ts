import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDockerWizardComponent } from './body-docker-wizard.component';

describe('BodyDockerWizardComponent', () => {
  let component: BodyDockerWizardComponent;
  let fixture: ComponentFixture<BodyDockerWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyDockerWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyDockerWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
