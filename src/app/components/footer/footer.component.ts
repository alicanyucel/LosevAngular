import { Component, inject } from '@angular/core';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-text">
          <p>&copy; {{ currentYear }} Ali Can Yücel - Tüm hakları saklıdır.</p>
          <div class="social-links">
            <a href="#" (click)="openLinkedIn($event)" class="social-link" title="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" (click)="openGitHub($event)" class="social-link" title="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="#" (click)="openWebSite($event)" class="social-link" title="Web Sitesi">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-links">
          <a href="#" (click)="openPrivacyPolicy($event)" class="footer-link">Gizlilik Politikası</a>
          <span class="separator">|</span>
          <a href="#" (click)="openTermsOfService($event)" class="footer-link">Kullanım Şartları</a>
          <span class="separator">|</span>
          <a href="#" (click)="openContact($event)" class="footer-link">İletişim</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 0;
      margin-top: auto;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
    }

    .footer-text p {
      margin: 0 0 10px 0;
      font-size: 14px;
      font-weight: 500;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .social-links {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 8px;
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .social-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .social-link:hover::before {
      opacity: 1;
    }

    .social-link:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .social-link svg {
      width: 18px;
      height: 18px;
      transition: all 0.3s ease;
      z-index: 1;
    }

    .social-link:hover svg {
      transform: scale(1.2) rotate(5deg);
    }

    /* LinkedIn mavi renk efekti */
    .social-link:nth-child(1):hover {
      background: linear-gradient(135deg, #0077b5, #005885);
      border-color: #0077b5;
    }

    /* GitHub siyah/gri renk efekti */
    .social-link:nth-child(2):hover {
      background: linear-gradient(135deg, #333, #24292e);
      border-color: #333;
    }

    /* Web sitesi turkuaz renk efekti */
    .social-link:nth-child(3):hover {
      background: linear-gradient(135deg, #1abc9c, #16a085);
      border-color: #1abc9c;
    }

    .footer-links {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .footer-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-size: 14px;
      padding: 5px 10px;
      border-radius: 15px;
      transition: all 0.3s ease;
      position: relative;
    }

    .footer-link:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .separator {
      color: rgba(255, 255, 255, 0.5);
      font-weight: 300;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        text-align: center;
        gap: 15px;
      }

      .footer-links {
        flex-wrap: wrap;
        justify-content: center;
      }

      .social-links {
        justify-content: center;
        margin-top: 10px;
      }
    }

    @media (max-width: 480px) {
      .footer-links {
        flex-direction: column;
        gap: 10px;
      }

      .separator {
        display: none;
      }
    }
  `]
})
export default class FooterComponent {
  private sweetAlert = inject(SweetAlertService);
  currentYear = new Date().getFullYear();

  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    this.sweetAlert.info(
      'Gizlilik Politikası',
      'Bu uygulama kişisel verilerinizin güvenliğini ön planda tutar. Verileriniz üçüncü kişilerle paylaşılmaz.'
    );
  }

  openTermsOfService(event: Event): void {
    event.preventDefault();
    this.sweetAlert.info(
      'Kullanım Şartları',
      'Bu uygulamayı kullanarak belirtilen kurallara uyacağınızı kabul etmiş olursunuz.'
    );
  }

  openContact(event: Event): void {
    event.preventDefault();
    this.sweetAlert.info(
      'İletişim Bilgileri',
      'Geliştirici: Ali Can Yücel\nE-posta: yucelalicandan@hotmail.com'
    );
  }

  openLinkedIn(event: Event): void {
    event.preventDefault();
    this.sweetAlert.info(
      'LinkedIn Profili',
      'LinkedIn: https://www.linkedin.com/in/ali-can-y%C3%BCcel-062b6517a/'
    );
  }

  openGitHub(event: Event): void {
    event.preventDefault();
    this.sweetAlert.info(
      'GitHub Profili',
      'GitHub: github.com/alicanyucel'
    );
  }

  openWebSite(event: Event): void {
    event.preventDefault();
    this.sweetAlert.info(
      'Kişisel web sitesi',
      'https://alicanyucel.com.tr/'
    );
  }
}
