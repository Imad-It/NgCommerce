import { Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../../products/models/product.model';

@Component({
  selector: 'app-admin-product-row',
  imports: [FaIconComponent],
  templateUrl: './admin-product-row.component.html',
  styleUrl: './admin-product-row.component.css',
})
export class AdminProductRowComponent {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  product = input.required<Product>();
}
