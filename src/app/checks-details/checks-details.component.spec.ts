import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksDetailsComponent } from './checks-details.component';

describe('ChecksDetailsComponent', () => {
  let component: ChecksDetailsComponent;
  let fixture: ComponentFixture<ChecksDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecksDetailsComponent]
    });
    fixture = TestBed.createComponent(ChecksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
