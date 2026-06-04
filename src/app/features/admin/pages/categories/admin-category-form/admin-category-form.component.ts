import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { form, FormField, minLength, required } from '@angular/forms/signals';
import { CategoryService } from '../../../../categories/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../../../../categories/models/category.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import * as formUtils from '../../../../../shared/utils/form.util';

@Component({
  selector: 'app-admin-category-form',
  imports: [CommonModule, FormField],
  templateUrl: './admin-category-form.component.html',
  styleUrl: './admin-category-form.component.css',
})
export class AdminCategoryFormComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);
  readonly formUtils = formUtils;
  private fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  private signalParam = toSignal(this.route.paramMap);
  id = computed(() => this.signalParam()?.get('id') ?? undefined);
  imageTouched = signal<boolean>(false);
  categoryModel = signal({
    id: '',
    name: '',
    slug: '',
    image: '',
    preview: '',
  });

  //  SINGLE SOURCE OF TRUTH
  categoryForm = form(this.categoryModel, (schema) => {
    required(schema.name, { message: 'Name is required.' });
    minLength(schema.name, 4, { message: 'Name must be at least 4 characters long.' });
    required(schema.slug, { message: 'Slug is required.' });
    minLength(schema.slug, 4, { message: 'Slug must be at least 4 characters long.' });
    required(schema.image, { message: 'Image is required.' });
  });

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
    this.imageTouched.set(true);
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
    this.fileInput()!.nativeElement.value = '';
  }

  // SAVE CATEGORY (CREATE)
  saveCategory() {
    if (this.categoryForm().invalid()) {
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
