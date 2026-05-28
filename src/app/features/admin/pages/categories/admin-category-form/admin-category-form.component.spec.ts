import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryFormComponent } from './admin-category-form.component';

describe('AdminCategoryFormComponent', () => {
  let component: AdminCategoryFormComponent;
  let fixture: ComponentFixture<AdminCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
