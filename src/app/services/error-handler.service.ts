import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private sweetAlert: SweetAlertService) { }

  errorHandler(error: HttpErrorResponse): void {
    let errorMessage = 'Bilinmeyen bir hata oluştu!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Hata: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Geçersiz istek!';
          break;
        case 401:
          errorMessage = 'Yetkilendirme hatası! Lütfen tekrar giriş yapın.';
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          break;
        case 403:
          errorMessage = 'Bu işlem için yetkiniz bulunmuyor!';
          break;
        case 404:
          errorMessage = 'Aranan kaynak bulunamadı!';
          break;
        case 500:
          errorMessage = 'Sunucu hatası! Lütfen daha sonra tekrar deneyin.';
          break;
        default:
          errorMessage = `Hata kodu: ${error.status}\nMesaj: ${error.message}`;
      }

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    console.error('HTTP Error:', error);
    console.error('Error Message:', errorMessage)
    this.sweetAlert.error('Hata!', errorMessage);
  }
}
