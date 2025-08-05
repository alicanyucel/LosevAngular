import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  isLoading = signal<boolean>(false);
  loadingMessage = signal<string>('Yükleniyor...');

  constructor() { }

  show(message: string = 'Yükleniyor...'): void {
    this.loadingMessage.set(message);
    this.isLoading.set(true);
  }

  hide(): void {
    this.isLoading.set(false);
    this.loadingMessage.set('Yükleniyor...');
  }
  async withLoading<T>(
    operation: () => Promise<T>, 
    message: string = 'Yükleniyor...'
  ): Promise<T> {
    this.show(message);
    try {
      const result = await operation();
      return result;
    } finally {
      this.hide();
    }
  }
}
