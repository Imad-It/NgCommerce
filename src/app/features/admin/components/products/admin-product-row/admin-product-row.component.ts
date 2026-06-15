import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../../../products/models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-admin-product-row]',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './admin-product-row.component.html',
  styleUrl: './admin-product-row.component.css',
})
export class AdminProductRowComponent {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  product = input.required<Product>();
  deleteInitiated = output<Product>();

  initiateDelete(product: Product) {
    this.deleteInitiated.emit(product);
  }
}
