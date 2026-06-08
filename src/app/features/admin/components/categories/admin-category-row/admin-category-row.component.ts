import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../../categories/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-admin-category-row]',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './admin-category-row.component.html',
  styleUrl: './admin-category-row.component.css',
})
export class AdminCategoryRowComponent {
  faTrash = faTrash;
  faEdit = faEdit;
  category = input.required<Category>();
  deleteInitiated = output<Category>();

  initiateDelete(category: Category) {
    this.deleteInitiated.emit(category);
  }
}
