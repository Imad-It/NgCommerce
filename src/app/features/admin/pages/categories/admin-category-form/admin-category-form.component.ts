import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { form, FormField } from '@angular/forms/signals';
import { CategoryService } from '../../../../categories/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../../../../categories/models/category.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-admin-category-form',
  imports: [CommonModule, FormField],
  templateUrl: './admin-category-form.component.html',
  styleUrl: './admin-category-form.component.css',
})
export class AdminCategoryFormComponent {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  notificationService = inject(NotificationService);
  private signalParam = toSignal(this.route.paramMap);

  id = computed(() => this.signalParam()?.get('id') ?? undefined);

  //  SINGLE SOURCE OF TRUTH
  categoryForm = form(
    signal({
      id: '',
      name: '',
      slug: '',
      image: '',
      preview: '',
    }),
  );

  // LOAD CATEGORY
  private loadCategory = effect(() => {
    const id = this.id();

    if (!id) {
      this.resetForm();
      return;
    }

    this.categoryService.getCategoryById(Number(id)).subscribe({
      next: (category: Category) => {
        this.categoryForm.id().value.set(category.id.toString());
        this.categoryForm.name().value.set(category.name);
        this.categoryForm.slug().value.set(category.slug);
        this.categoryForm.image().value.set(category.image);
        this.categoryForm.preview().value.set(category.image);
      },

      error: (err) => {
        console.error('Error loading category:', err);
      },
    });
  });

  // STATES
  loading = signal(false);
  uploading = signal(false);

  // IMAGE SELECT
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // reset preview + image
    this.categoryForm.image().value.set('');
    this.categoryForm.preview().value.set('');

    // preview locally
    const reader = new FileReader();
    reader.onload = () => {
      this.categoryForm.preview().value.set(reader.result as string);
    };
    reader.readAsDataURL(file);

    this.uploading.set(true);

    this.categoryService.uploadImage(file).subscribe({
      next: (res) => {
        const imageUrl = res.location || res.url;

        if (!imageUrl) return;

        this.categoryForm.image().value.set(imageUrl);
      },

      error: (err) => {
        console.error(err);
        this.uploading.set(false);
      },

      complete: () => {
        this.uploading.set(false);
      },
    });
  }

  // REMOVE IMAGE
  removeImage() {
    this.categoryForm.image().value.set('');
    this.categoryForm.preview().value.set('');
  }

  // SAVE CATEGORY (CREATE)
  saveCategory() {
    if (
      this.categoryForm.name().invalid() ||
      this.categoryForm.slug().invalid() ||
      this.categoryForm.image().invalid()
    ) {
      console.log('FORM INVALID');
      return;
    }

    this.loading.set(true);

    const data = {
      name: this.categoryForm.name().value(),
      slug: this.categoryForm.slug().value(),
      image: this.categoryForm.image().value(),
    };

    this.categoryService.createCategory(data).subscribe({
      next: () => {
        this.resetForm();
        this.notificationService.showSuccess('Created', 'Category created successfully');
        this.router.navigate(['..'], { relativeTo: this.route });
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

  // EDIT CATEGORY
  editCategory() {
    const id = this.id();
    if (!id) return;

    this.loading.set(true);

    const data = {
      name: this.categoryForm.name().value(),
      slug: this.categoryForm.slug().value(),
      image: this.categoryForm.image().value(),
    };

    this.categoryService.updateCategory(Number(id), data).subscribe({
      next: () => {
        this.notificationService.showSuccess('Updated', 'Category updated successfully');
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
    this.categoryForm.id().value.set('');
    this.categoryForm.name().value.set('');
    this.categoryForm.slug().value.set('');
    this.categoryForm.image().value.set('');
    this.categoryForm.preview().value.set('');
  }
}
