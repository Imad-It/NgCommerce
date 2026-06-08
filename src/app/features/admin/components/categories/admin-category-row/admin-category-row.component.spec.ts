import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryRowComponent } from './admin-category-row.component';

describe('AdminCategoryCardComponent', () => {
  let component: AdminCategoryRowComponent;
  let fixture: ComponentFixture<AdminCategoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryRowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
