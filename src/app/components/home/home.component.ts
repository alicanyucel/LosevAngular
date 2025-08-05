import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div style="padding: 20px; text-align: center;">
      <h1>Hoş Geldiniz!</h1>
      <p>Başarıyla giriş yaptınız.</p>
      <button (click)="logout()" style="padding: 10px 20px; margin-top: 20px;">Çıkış Yap</button>
    </div>
  `
})
export default class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
