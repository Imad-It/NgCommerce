import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { form, required, minLength, FormField } from '@angular/forms/signals';

import { CategoryService } from '../../../../categories/services/category.service';

@Component({
  selector: 'app-admin-category-form',
  imports: [CommonModule, FormField],
  templateUrl: './admin-category-form.component.html',
  styleUrl: './admin-category-form.component.css',
})
export class AdminCategoryFormComponent {
  private categoryService = inject(CategoryService);

  // MODEL
  categoryModel = signal({
    name: '',
    slug: '',
    image: '',
    preview: '',
  });

  // SIGNAL FORM
  categoryForm = form(this.categoryModel);

  // STATES
  loading = signal(false);
  uploading = signal(false);

  // IMAGE SELECT
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    // RESET IMAGE
    this.categoryModel.update((f) => ({
      ...f,
      image: '',
      preview: '',
    }));

    // PREVIEW IMAGE
    const reader = new FileReader();

    reader.onload = () => {
      this.categoryModel.update((f) => ({
        ...f,
        preview: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);

    // UPLOAD START
    this.uploading.set(true);

    this.categoryService.uploadImage(file).subscribe({
      next: (res) => {
        const imageUrl = res.location || res.url;

        if (!imageUrl) return;

        this.categoryModel.update((f) => ({
          ...f,
          image: imageUrl,
        }));
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
    this.categoryModel.update((f) => ({
      ...f,
      image: '',
      preview: '',
    }));
  }

  // SAVE CATEGORY
  saveCategory() {
    // ✅ STATE-BASED VALIDATION (KORREKT)
    if (
      this.categoryForm.name().invalid() ||
      this.categoryForm.slug().invalid() ||
      this.categoryForm.image().invalid()
    ) {
      console.log('FORM INVALID');
      return;
    }

    this.loading.set(true);

    const model = this.categoryModel();

    const data = {
      name: model.name,
      slug: model.slug,
      image: model.image,
    };

    this.categoryService.createCategory(data).subscribe({
      next: () => {
        // RESET FORM
        this.categoryModel.set({
          name: '',
          slug: '',
          image: '',
          preview: '',
        });
      },

      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
