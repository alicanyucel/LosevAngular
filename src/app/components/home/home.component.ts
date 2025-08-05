import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-home',
  template: `
    <div style="padding: 20px; text-align: center;">
      <h1>Hoş Geldiniz!</h1>
      <p>Başarıyla giriş yaptınız.</p>
      <button (click)="logout()" style="padding: 10px 20px; margin-top: 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">Çıkış Yap</button>
    </div>
  `
})
export default class HomeComponent {
  private router = inject(Router);
  private sweetAlert = inject(SweetAlertService);

  logout() {
    this.sweetAlert.confirm(
      'Çıkış Yapılsın mı?',
      'Oturumunuz sonlandırılacak ve login sayfasına yönlendirileceksiniz.',
      'Evet, Çıkış Yap',
      'İptal'
    ).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.sweetAlert.toast('Çıkış işlemi başarılı!', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
    });
  }
}
