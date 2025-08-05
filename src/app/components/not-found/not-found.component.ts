import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Sayfa Bulunamadı</h2>
        <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        <div class="buttons">
          <button routerLink="/login" class="btn btn-primary">Ana Sayfaya Dön</button>
          <button (click)="goBack()" class="btn btn-secondary">Geri Git</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }

    .not-found-content {
      max-width: 500px;
    }

    .not-found-content h1 {
      font-size: 8rem;
      font-weight: bold;
      margin: 0;
      opacity: 0.8;
    }

    .not-found-content h2 {
      font-size: 2rem;
      margin: 20px 0;
    }

    .not-found-content p {
      font-size: 1.1rem;
      margin-bottom: 30px;
      opacity: 0.9;
    }

    .buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    @media (max-width: 576px) {
      .not-found-content h1 {
        font-size: 6rem;
      }
      
      .not-found-content h2 {
        font-size: 1.5rem;
      }
      
      .buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 200px;
      }
    }
  `],
  imports: [RouterLink]
})
export default class NotFoundComponent {
  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }
}
