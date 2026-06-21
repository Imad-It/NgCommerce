import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { finalize } from 'rxjs/operators';
import { ProductQuery } from '../models/product-query.model';
import { Category } from '../../categories/models/category.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  getProducts(query?: ProductQuery): Observable<Product[]> {
    this.loadingService.setLoading(true);

    let params = new HttpParams();

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      }
    }

    return this.http
      .get<Product[]>(`${this.baseUrl}/products`, { params })
      .pipe(finalize(() => this.loadingService.setLoading(false)));
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
  createProduct(data: {
    title: string;
    slug: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, data);
  }

  deleteProducts(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/products/${id}`);
  }
}
