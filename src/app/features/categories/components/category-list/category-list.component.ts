import { Component, input } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-list',
  imports: [CategoryCardComponent, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categories = input.required<Category[]>();
}
