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
      confirmButtonText: '<i class="fa fa-check me-2"></i>Tamam',
      allowHtml: true
    });
  }
  error(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-times me-2"></i>Tamam',
      allowHtml: true
    });
  }

  warning(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonColor: '#f39c12',
      confirmButtonText: '<i class="fa fa-exclamation-triangle me-2"></i>Tamam',
      allowHtml: true
    });
  }

  info(title: string, text?: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-info-circle me-2"></i>Tamam',
      allowHtml: true
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
      confirmButtonText: `<i class="fa fa-check me-2"></i>${confirmButtonText}`,
      cancelButtonText: `<i class="fa fa-times me-2"></i>${cancelButtonText}`,
      allowHtml: true
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
      confirmButtonText: '<i class="fa fa-trash me-2"></i>Evet, Sil!',
      cancelButtonText: '<i class="fa fa-times me-2"></i>İptal',
      allowHtml: true
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
      confirmButtonText: `<i class="fa fa-save me-2"></i>${this.i18n.translate('save')}`,
      cancelButtonText: `<i class="fa fa-times me-2"></i>${this.i18n.translate('cancel')}`,
      allowHtml: true,
      inputValidator: (value: any) => {
        if (!value) {
          return this.i18n.translate('fieldRequired');
        }
        return null;
      }
    });
  }

  customInput(title: string, html: string, confirmButtonText: string = 'Tamam', cancelButtonText: string = 'İptal') {
    return Swal.fire({
      title: title,
      html: html,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `<i class="fa fa-save me-2"></i>${confirmButtonText}`,
      cancelButtonText: `<i class="fa fa-times me-2"></i>${cancelButtonText}`,
      allowHtml: true,
      preConfirm: () => {
        const name = (document.getElementById('swal-input-name') as HTMLInputElement)?.value;
        const url = (document.getElementById('swal-input-url') as HTMLInputElement)?.value;
        const password = (document.getElementById('swal-input-password') as HTMLInputElement)?.value;
        
        if (!name || !url || !password) {
          Swal.showValidationMessage(this.i18n.translate('fieldRequired'));
          return false;
        }
        
        return { name: name.trim(), url: url.trim(), password: password };
      }
    });
  }
}
