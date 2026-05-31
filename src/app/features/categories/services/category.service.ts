import { inject, Injectable, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { LoadingService } from '../../../core/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  getCategories(): Observable<Category[]> {
    this.loadingService.setLoading(true);
    return this.http
      .get<Category[]>(`${this.baseUrl}/categories`)
      .pipe(finalize(() => this.loadingService.setLoading(false)));
  }

  deleteCategory(id: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(data: { name: string; slug: string; image: string }): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, data);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/files/upload`, formData);
  }
  getCategoryById(id: number): Observable<Category> {
    console.log('SERVICE CALLED');
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }
  updateCategory(
    id: number,
    data: {
      name: string;
      slug: string;
      image: string;
    },
  ): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${id}`, data);
  }
}
