import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailComponent } from './profile-detail.component';

describe('ProfileDetailComponent', () => {
  let component: ProfileDetailComponent;
  let fixture: ComponentFixture<ProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
