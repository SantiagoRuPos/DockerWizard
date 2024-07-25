import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerLogsComponent } from './docker-logs.component';

describe('DockerLogsComponent', () => {
  let component: DockerLogsComponent;
  let fixture: ComponentFixture<DockerLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DockerLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DockerLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
