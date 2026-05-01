import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal<Boolean>(false);

  setLoading(value: boolean) {
    this.isLoading.set(value);
  }
}
