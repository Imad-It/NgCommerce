import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryCardComponent } from './admin-category-card.component';

describe('AdminCategoryCardComponent', () => {
  let component: AdminCategoryCardComponent;
  let fixture: ComponentFixture<AdminCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
