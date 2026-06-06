import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductRowComponent } from './admin-product-row.component';

describe('AdminProductRowComponent', () => {
  let component: AdminProductRowComponent;
  let fixture: ComponentFixture<AdminProductRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductRowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
