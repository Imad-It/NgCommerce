import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductListComponent } from './admin-product-list.component';

describe('AdminProductListComponent', () => {
  let component: AdminProductListComponent;
  let fixture: ComponentFixture<AdminProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
