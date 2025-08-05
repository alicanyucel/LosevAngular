import { Injectable } from '@angular/core';

declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  // Success alert
  success(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tamam'
    });
  }

  // Error alert
  error(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Tamam'
    });
  }

  // Warning alert
  warning(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonColor: '#f39c12',
      confirmButtonText: 'Tamam'
    });
  }

  // Info alert
  info(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tamam'
    });
  }

  // Confirmation dialog
  confirm(title: string, text?: string, confirmButtonText: string = 'Evet', cancelButtonText: string = 'Hayır') {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }

  // Delete confirmation
  deleteConfirm(title: string = 'Silmek istediğinizden emin misiniz?', text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal'
    });
  }

  // Toast notification
  toast(title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: icon,
      title: title
    });
  }

  // Loading alert
  loading(title: string = 'Yükleniyor...', text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  // Close any open dialog
  close() {
    Swal.close();
  }
}
