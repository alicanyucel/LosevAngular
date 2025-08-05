import { Injectable, inject } from '@angular/core';
import { I18nService } from './i18n.service';

declare var Swal: any;

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  private i18n = inject(I18nService);

  constructor() { }
  success(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tamam'
    });
  }
  error(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Tamam'
    });
  }

  warning(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonColor: '#f39c12',
      confirmButtonText: 'Tamam'
    });
  }

  info(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Tamam'
    });
  }

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

  close() {
    Swal.close();
  }

  input(title: string, inputPlaceholder: string = '', inputValue: string = '', inputType: string = 'text') {
    return Swal.fire({
      title: title,
      input: inputType,
      inputPlaceholder: inputPlaceholder,
      inputValue: inputValue,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.i18n.translate('save'),
      cancelButtonText: this.i18n.translate('cancel'),
      inputValidator: (value: any) => {
        if (!value) {
          return this.i18n.translate('fieldRequired');
        }
        return null;
      }
    });
  }
}
