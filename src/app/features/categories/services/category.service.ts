import { inject, Injectable } from '@angular/core';
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
}
