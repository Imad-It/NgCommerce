import { HttpClient } from '@angular/common/http';
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

  getProducts(offset?: number, limit?: number): Observable<Product[]> {
    this.loadingService.setLoading(true);
    let queryParams = '';
    if (offset !== undefined && limit !== undefined) {
      queryParams = `?offset=${offset}&limit=${limit}`;
    }
    return this.http
      .get<Product[]>(`${this.baseUrl}/products${queryParams}`)
      .pipe(finalize(() => this.loadingService.setLoading(false)));
  }
}
