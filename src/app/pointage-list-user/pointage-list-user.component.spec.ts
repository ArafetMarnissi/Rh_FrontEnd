import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageListUserComponent } from './pointage-list-user.component';

describe('PointageListUserComponent', () => {
  let component: PointageListUserComponent;
  let fixture: ComponentFixture<PointageListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointageListUserComponent]
    });
    fixture = TestBed.createComponent(PointageListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
