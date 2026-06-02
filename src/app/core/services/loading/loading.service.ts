import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal<boolean>(true);

  setLoading(value: boolean) {
    this.isLoading.set(value);
  }
}
