import { Component, inject, input, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../../categories/models/category.model';

@Component({
  selector: 'app-admin-category-card',
  imports: [FaIconComponent],
  templateUrl: './admin-category-card.component.html',
  styleUrl: './admin-category-card.component.css',
})
export class AdminCategoryCardComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  category = input.required<Category>();
  deleteInitiated = output<Category>();

  initiateDelete(category: Category) {
    this.deleteInitiated.emit(category);
  }
}
