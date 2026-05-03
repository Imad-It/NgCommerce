import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
import { LoadingService } from '../../../core/services/loading.service';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  getProducts(offset?: number, limit?: number, categorySlug?: string): Observable<Product[]> {
    this.loadingService.setLoading(true);

    const params = new HttpParams()
      .set('offset', offset?.toString() ?? '')
      .set('limit', limit?.toString() ?? '')
      .set('categorySlug', categorySlug ?? '');
    return this.http
      .get<Product[]>(`${this.baseUrl}/products`, { params })
      .pipe(finalize(() => this.loadingService.setLoading(false)));
  }
}
