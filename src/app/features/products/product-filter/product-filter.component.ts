import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CategoryService } from '../../categories/services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../../categories/models/category.model';

@Component({
  selector: 'app-product-filter',
  imports: [FaIconComponent, NgxSliderModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent {
  private categoryService = inject(CategoryService);
  categories = toSignal(this.categoryService.getCategories(), { initialValue: [] as Category[] });
  faMagnifyingGlass = faMagnifyingGlass;
  faArrowRotateRight = faArrowRotateRight;
  minPrice = 50;
  maxPrice = 300;

  options: Options = {
    floor: 0,
    ceil: 1000,
    step: 10,
    translate: (value: number): string => value + ' €',
  };
  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log('Selected value:', selectElement.value);
  }
}
