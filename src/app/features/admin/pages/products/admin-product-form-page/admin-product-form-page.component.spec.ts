import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductFormPageComponent } from './admin-product-form-page.component';

describe('AdminProductFormPageComponent', () => {
  let component: AdminProductFormPageComponent;
  let fixture: ComponentFixture<AdminProductFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductFormPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
