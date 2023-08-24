import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProfilComponent } from './personal-profil.component';

describe('PersonalProfilComponent', () => {
  let component: PersonalProfilComponent;
  let fixture: ComponentFixture<PersonalProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalProfilComponent]
    });
    fixture = TestBed.createComponent(PersonalProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
