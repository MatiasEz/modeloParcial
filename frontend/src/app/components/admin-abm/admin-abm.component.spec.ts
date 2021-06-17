import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAbmComponent } from './admin-abm.component';

describe('AdminAbmComponent', () => {
  let component: AdminAbmComponent;
  let fixture: ComponentFixture<AdminAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
