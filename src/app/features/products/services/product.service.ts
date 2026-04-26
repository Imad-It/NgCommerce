import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getProducts(offset?: number, limit?: number): Observable<Product[]> {
    if (offset !== undefined && limit !== undefined) {
      return this.http.get<Product[]>(`${this.baseUrl}/products?offset=${offset}&limit=${limit}`);
    } else {
      return this.http.get<Product[]>(`${this.baseUrl}/products`);
    }
  }
}
