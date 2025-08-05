import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="welcome-card">
        <div class="welcome-icon">
          🎉
        </div>
        <h1 class="welcome-title">Hoş Geldiniz!</h1>
        <p class="welcome-message">Başarıyla giriş yaptınız.</p>
        <p class="user-info">Sisteme erişiminiz aktif durumdadır.</p>
        <button class="logout-btn" (click)="logout()">
          <span class="logout-icon">🚪</span>
          Çıkış Yap
        </button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .welcome-card {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 450px;
      width: 100%;
      transform: translateY(-10px);
      animation: slideIn 0.6s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .welcome-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }

    .welcome-title {
      color: #2c3e50;
      margin: 0 0 15px 0;
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .welcome-message {
      color: #7f8c8d;
      font-size: 1.2rem;
      margin: 0 0 10px 0;
      font-weight: 500;
    }

    .user-info {
      color: #95a5a6;
      font-size: 1rem;
      margin: 0 0 30px 0;
    }

    .logout-btn {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 8px 20px rgba(231, 76, 60, 0.3);
    }

    .logout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(231, 76, 60, 0.4);
      background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    }

    .logout-btn:active {
      transform: translateY(0);
    }

    .logout-icon {
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 15px;
        min-height: 70vh;
      }
      
      .welcome-card {
        padding: 30px 20px;
      }
      
      .welcome-title {
        font-size: 2rem;
      }
      
      .welcome-message {
        font-size: 1.1rem;
      }
    }
  `]
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
