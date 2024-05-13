import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersCygnusComponent } from './list-users-cygnus.component';

describe('ListUsersCygnusComponent', () => {
  let component: ListUsersCygnusComponent;
  let fixture: ComponentFixture<ListUsersCygnusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsersCygnusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUsersCygnusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
