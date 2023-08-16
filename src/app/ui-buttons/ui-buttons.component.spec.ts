import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonsComponent } from './ui-buttons.component';

describe('UiButtonsComponent', () => {
  let component: UiButtonsComponent;
  let fixture: ComponentFixture<UiButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiButtonsComponent]
    });
    fixture = TestBed.createComponent(UiButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
