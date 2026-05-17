import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRotateRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LabelType, NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CategoryService } from '../../categories/services/category.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../../categories/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  imports: [FaIconComponent, NgxSliderModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent {
  // -------------------------
  // DEPENDENCIES
  // -------------------------
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // -------------------------
  // ICONS
  // -------------------------
  faMagnifyingGlass = faMagnifyingGlass;
  faArrowRotateRight = faArrowRotateRight;

  // -------------------------
  // CONSTANTS
  // -------------------------
  searchTerm = signal('');
  selectedCategory = signal('');

  // -------------------------
  // SLIDER OPTIONS
  // -------------------------
  price_min = signal(20);
  price_max = signal(300);

  options: Options = {
    floor: 0,
    ceil: 500,
    step: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<span class="text-muted small">Min: <b class="text-danger fw-semibold">${value}€</b></span>`;
        case LabelType.High:
          return `<span class="text-muted small">Max: <b class="text-danger fw-semibold">${value}€</b></span>`;
        default:
          return `${value}€`;
      }
    },
  };

  // -------------------------
  // DATA
  // -------------------------
  categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as Category[],
  });
  private paramSignals = toSignal(this.route.queryParamMap);

  // -------------------------
  // USER INPUT
  // -------------------------
  onSearch(value: string) {
    this.searchTerm.set(value);
    this.updateQueryParams();
  }
  onPriceMinChange(value: number) {
    this.price_min.set(value);
    this.updateQueryParams();
  }

  onPriceMaxChange(value: number) {
    this.price_max.set(value);
    this.updateQueryParams();
  }

  onSelectChange(value: string) {
    this.selectedCategory.set(value);
    this.updateQueryParams();
  }

  resetFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.price_min.set(20);
    this.price_max.set(300);
    this.updateQueryParams();
  }

  // -------------------------
  // URL → STATE SYNC
  // -------------------------
  syncQueryParamsEffect = effect(() => {
    const params = this.paramSignals();
    if (!params) return;

    const category = params.get('categorySlug');
    const title = params.get('title');
    const min = params.get('price_min');
    const max = params.get('price_max');

    if (category !== null) {
      this.selectedCategory.set(category);
    }

    if (title !== null) {
      this.searchTerm.set(title);
    }

    if (min !== null) {
      this.price_min.set(Number(min));
    }

    if (max !== null) {
      this.price_max.set(Number(max));
    }
  });

  // -------------------------
  // STATE → URL SYNC
  // -------------------------
  updateQueryParams() {
    const queryParams = {
      title: this.searchTerm().trim() || null,
      categorySlug: this.selectedCategory() || null,
      price_min: this.price_min(),
      price_max: this.price_max(),
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }
}
