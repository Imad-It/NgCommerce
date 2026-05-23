import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryPageComponent } from './admin-category-page.component';

describe('AdminCategoryPageComponent', () => {
  let component: AdminCategoryPageComponent;
  let fixture: ComponentFixture<AdminCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
