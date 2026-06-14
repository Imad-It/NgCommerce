import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductDetailsPageComponent } from './admin-product-details-page.component';

describe('AdminProductDetailsPageComponent', () => {
  let component: AdminProductDetailsPageComponent;
  let fixture: ComponentFixture<AdminProductDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductDetailsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
