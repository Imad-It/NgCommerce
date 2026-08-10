import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/files/upload`, formData);
  }
}
