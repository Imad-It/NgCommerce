import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../categories/services/category.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { ProductService } from '../../../../products/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../products/models/product.model';

@Component({
  selector: 'app-admin-product-form-page',
  imports: [CommonModule, FormField],
  templateUrl: './admin-product-form-page.component.html',
  styleUrl: './admin-product-form-page.component.css',
})
export class AdminProductFormPageComponent {
  private route = inject(ActivatedRoute);
  router = inject(Router);

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  products = toSignal(this.productService.getProducts());
  categories = toSignal(this.categoryService.getCategories());

  private signalParam = toSignal(this.route.paramMap);
  activeIndex = signal<number>(0);
  private fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  id = computed(() => this.signalParam()?.get('id') ?? undefined);

  loading = signal(false);
  uploading = signal(false);
  imageTouched = signal(false);

  productModel = signal({
    id: '',
    title: '',
    slug: '',
    price: '',
    description: '',
    category: '',
    images: [] as string[],
    previews: [] as string[],
  });

  productForm = form(this.productModel, (schema) => {
    required(schema.title, { message: 'Name is required' });

    minLength(schema.title, 4, { message: 'Must be at least 4 characters' });

    required(schema.slug, { message: 'At least one image is required' });
    required(schema.price, { message: 'At least one image is required' });
    required(schema.description, { message: 'At least one image is required' });
    required(schema.category, { message: 'At least one image is required' });
    required(schema.images, { message: 'At least one image is required' });
  });

  // LOAD PRODUCT
  private loadProduct = effect(() => {
    const id = this.id();

    if (!id) {
      this.resetForm();
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.productForm.id().value.set(product.id.toString());
        this.productForm.title().value.set(product.title);
        this.productForm.price().value.set(product.price.toString());
        this.productForm.description().value.set(product.description);
        this.productForm.slug().value.set(product.slug);
        this.productForm.category().value.set(product.category.id.toString());
        this.productForm.images().value.set(product.images);
        this.productForm.previews().value.set(product.images);
      },

      error: (err) => {
        console.error('Error loading category:', err);
      },
    });
  });

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const files = Array.from(input.files);

    this.imageTouched.set(true);
    this.uploading.set(true);

    // Lokale Vorschau erzeugen
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        this.productForm
          .previews()
          .value.update((current) => [...current, reader.result as string]);
      };

      reader.readAsDataURL(file);
    });

    // Upload aller Bilder
    forkJoin(files.map((file) => this.categoryService.uploadImage(file))).subscribe({
      next: (responses) => {
        const urls = responses.map((res) => res.location || res.url).filter(Boolean);

        this.productForm.images().value.update((current) => [...current, ...urls]);
      },

      error: (error) => {
        console.error(error);

        this.notificationService.showError('Error', 'Error uploading images');

        this.uploading.set(false);
      },

      complete: () => {
        this.uploading.set(false);
      },
    });
  }

  onRemoveImage(index: number) {
    this.removePreviewImage(index);
  }

  removePreviewImage(index: number): void {
    this.productForm.previews().value.update((current) => current.filter((_, i) => i !== index));

    this.productForm.images().value.update((current) => current.filter((_, i) => i !== index));

    const length = this.productForm.previews().value().length;

    if (length === 0) {
      this.activeIndex.set(0);
      return;
    }

    if (this.activeIndex() >= length) {
      this.activeIndex.set(length - 1);
    }
  }

  saveProduct() {
    if (this.productForm().invalid()) {
      console.log('FORM INVALID');
      return;
    }

    this.loading.set(true);

    const data = {
      title: this.productForm.title().value(),
      slug: this.productForm.slug().value(),
      price: Number(this.productForm.price().value()),
      description: this.productForm.description().value(),
      categoryId: Number(this.productForm.category().value()),
      images: this.productForm.images().value(),
    };

    this.productService.createProduct(data).subscribe({
      next: () => {
        this.resetForm();

        this.notificationService.showSuccess('Created', 'Product created successfully');

        this.router.navigate(['/admin/products']).then(() => {
          window.location.reload();
        });
      },

      error: (err) => {
        console.error(err);

        this.notificationService.showError('Error', 'Operation failed. Please try again.');
      },

      complete: () => {
        this.loading.set(false);
      },
    });
  }

  editProduct() {
    const id = this.id();
    if (!id) return;

    this.loading.set(true);

    const data = {
      title: this.productForm.title().value(),
      slug: this.productForm.slug().value(),
      price: Number(this.productForm.price().value()),
      description: this.productForm.description().value(),
      categoryId: Number(this.productForm.category().value()),
      images: this.productForm.images().value(),
    };

    this.productService.updateProduct(Number(id), data).subscribe({
      next: () => {
        this.notificationService.showSuccess('Updated', 'Product updated successfully');
        this.router.navigate(['../..'], { relativeTo: this.route });
      },

      error: (err) => {
        console.error(err);
        this.notificationService.showError('Error', 'Operation failed. Please try again.');
      },

      complete: () => {
        this.loading.set(false);
      },
    });
  }
  // RESET FORM
  private resetForm() {
    this.productForm.title().value.set('');
    this.productForm.slug().value.set('');
    this.productForm.price().value.set('');
    this.productForm.description().value.set('');
    this.productForm.category().value.set('');

    this.productForm.images().value.set([]);
    this.productForm.previews().value.set([]);
  }

  previous() {
    const length = this.productForm.previews().value().length;
    if (length <= 1) return;
    this.activeIndex.update((index) => (index - 1 + length) % length);
  }

  next() {
    const length = this.productForm.previews().value().length;
    if (length <= 1) return;
    this.activeIndex.update((index) => (index + 1) % length);
  }
}
