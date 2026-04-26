import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'https://api.escuelajs.co/api/v1/products';

  private http = inject(HttpClient);

  getProducts(offset?: number, limit?: number): Observable<Product[]> {
    if (offset !== undefined && limit !== undefined) {
      return this.http.get<Product[]>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
    } else {
      return this.http.get<Product[]>(this.apiUrl);
    }
  }
}
