import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ProductService } from '../../../../products/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../categories/services/category.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import * as formUtils from '../../../../../shared/utils/form.util';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule, RouterLink, FaIconComponent],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css',
})
export class AdminProductListComponent {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getProducts());
  faTrash = faTrash;
  faEdit = faEdit;
  faEye = faEye;
}
