import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductPageComponent } from './admin-product-page.component';

describe('AdminProductPageComponent', () => {
  let component: AdminProductPageComponent;
  let fixture: ComponentFixture<AdminProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
