import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { SearchGroupPipe } from '../../pipes/search-group.pipe';
import { I18nService, LANGUAGES, LanguageData } from '../../services/i18n.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CookieService } from '../../services/cookie.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, SearchGroupPipe, TranslatePipe, BreadcrumbComponent]
})
export class HomeComponent {
  private sweetAlert = inject(SweetAlertService);
  private i18n = inject(I18nService);
  private cookieService = inject(CookieService);
  private breadcrumbService = inject(BreadcrumbService);
  
  username = 'Test';
  searchTerm = '';
  isDarkTheme = false;
  languages = LANGUAGES;

  constructor() {
    // Breadcrumb'u ayarla
    this.breadcrumbService.reset();
    this.breadcrumbService.add('passwords', '/home', 'key');
    
    // Cookie'den tema durumunu oku, yoksa LocalStorage'dan oku
    const savedThemeFromCookie = this.cookieService.getCookie('user_theme');
    const savedThemeFromStorage = localStorage.getItem('theme');
    
    if (savedThemeFromCookie) {
      this.isDarkTheme = savedThemeFromCookie === 'dark';
    } else if (savedThemeFromStorage) {
      this.isDarkTheme = savedThemeFromStorage === 'dark';
      // Storage'dan cookie'ye geçir
      this.cookieService.setCookie('user_theme', savedThemeFromStorage, 365);
    }
    
    this.applyTheme();
  }

  groups = [
    {
      name: 'Masastü',
      passwords: [
        { name: 'Sql SA', url: '123456', password: '123456', show: false }
      ]
    },
    {
      name: 'Web',
      passwords: [
        { name: '', url: '', password: '', show: false }
      ]
    },
    {
      name: 'Games',
      passwords: [
        { name: 'Barbie Giydirmece', url: 'www.kraloyun.com/barbiegiydirmece', password: 'Barbi123*', show: false }
      ]
    }
  ];

  toggleShow(pass: any) {
    pass.show = !pass.show;
    if (pass.show) {
      this.sweetAlert.toast(this.translate('passwordShown'), 'info');
    } else {
      this.sweetAlert.toast(this.translate('passwordHidden'), 'info');
    }
  }

  createNewGroup() {
    this.sweetAlert.input(this.translate('createNewGroup'), this.translate('enterGroupName')).then((result: any) => {
      if (result.isConfirmed && result.value) {
        this.groups.push({ name: result.value.trim(), passwords: [] });
        this.sweetAlert.toast(this.translate('newGroupCreated'), 'success');
      }
    });
  }

  addPass(group: any) {
    this.sweetAlert.input(this.translate('passName'), this.translate('enterPasswordName')).then((nameResult: any) => {
      if (nameResult.isConfirmed && nameResult.value) {
        this.sweetAlert.input(this.translate('url'), this.translate('enterUrl')).then((urlResult: any) => {
          if (urlResult.isConfirmed && urlResult.value) {
            this.sweetAlert.input(this.translate('password'), this.translate('enterPassword'), '', 'password').then((passResult: any) => {
              if (passResult.isConfirmed && passResult.value) {
                group.passwords.push({ 
                  name: nameResult.value.trim(), 
                  url: urlResult.value.trim(), 
                  password: passResult.value, 
                  show: false 
                });
                this.sweetAlert.toast(this.translate('passwordAdded'), 'success');
              }
            });
          }
        });
      }
    });
  }

  editPass(pass: any) {
    this.sweetAlert.input(this.translate('editPasswordName'), this.translate('enterPasswordName'), pass.name).then((nameResult: any) => {
      if (nameResult.isConfirmed && nameResult.value) {
        this.sweetAlert.input(this.translate('editUrl'), this.translate('enterUrl'), pass.url).then((urlResult: any) => {
          if (urlResult.isConfirmed && urlResult.value) {
            this.sweetAlert.input(this.translate('editPassword'), this.translate('enterPassword'), pass.password, 'password').then((passResult: any) => {
              if (passResult.isConfirmed && passResult.value) {
                pass.name = nameResult.value.trim();
                pass.url = urlResult.value.trim();
                pass.password = passResult.value;
                this.sweetAlert.toast(this.translate('passwordUpdated'), 'success');
              }
            });
          }
        });
      }
    });
  }

  deletePass(group: any, pass: any) {
    this.sweetAlert.deleteConfirm(`"${pass.name}" ${this.translate('deleteConfirmPassword')}`, this.translate('deleteWarningPassword')).then((result: any) => {
      if (result.isConfirmed) {
        const index = group.passwords.indexOf(pass);
        if (index !== -1) {
          group.passwords.splice(index, 1);
          this.sweetAlert.toast(this.translate('passwordDeleted'), 'success');
        }
      }
    });
  }

  editGroup(group: any) {
    this.sweetAlert.input(this.translate('editGroupName'), this.translate('enterGroupName'), group.name).then((result: any) => {
      if (result.isConfirmed && result.value) {
        group.name = result.value.trim();
        this.sweetAlert.toast(this.translate('groupUpdated'), 'success');
      }
    });
  }

  deleteGroup(group: any) {
    this.sweetAlert.deleteConfirm(`"${group.name}" ${this.translate('deleteConfirmGroup')}`, this.translate('deleteWarningGroup')).then((result: any) => {
      if (result.isConfirmed) {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
          this.groups.splice(index, 1);
          this.sweetAlert.toast(this.translate('groupDeleted'), 'success');
        }
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    const themeValue = this.isDarkTheme ? 'dark' : 'light';
    // Hem cookie'ye hem localStorage'a kaydet
    this.cookieService.setCookie('user_theme', themeValue, 365); // 1 yıl
    localStorage.setItem('theme', themeValue);
    this.sweetAlert.toast(`${this.isDarkTheme ? this.translate('dark') : this.translate('light')} ${this.translate('themeChanged')}`, 'info');
  }

  applyTheme() {
    if (this.isDarkTheme) {
      document.body.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.removeAttribute('data-bs-theme');
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }

  getCurrentLanguage(): LanguageData {
    return this.i18n.getCurrentLanguageData();
  }

  changeLanguage(languageCode: string) {
    this.i18n.setLanguage(languageCode);
    this.sweetAlert.toast(`${this.i18n.translate('language')}: ${this.i18n.getCurrentLanguageData().name}!`, 'info');
  }

  translate(key: string): string {
    return this.i18n.translate(key);
  }

  // Debug: Cookie'leri göster (geliştirme amaçlı)
  showCookies() {
    const cookies = this.cookieService.getAllCookies();
    console.log('Tüm Cookie\'ler:', cookies);
    
    if (Object.keys(cookies).length === 0) {
      this.sweetAlert.info(this.translate('cookieInfo'), this.translate('noCookiesFound'));
      return;
    }
    
    // Cookie'leri formatla
    let cookieDetails = `${this.translate('cookieCount')}: ${Object.keys(cookies).length}\n\n`;
    
    for (const [name, value] of Object.entries(cookies)) {
      cookieDetails += `${this.translate('cookieName')}: ${name}\n`;
      cookieDetails += `${this.translate('cookieValue')}: ${value}\n\n`;
    }
    
    this.sweetAlert.info(this.translate('cookieDetails'), cookieDetails);
  }

  // Cookie'leri temizle
  clearCookies() {
    this.sweetAlert.confirm(this.translate('clearCookies'), 'Tüm cookie\'ler silinecek. Emin misiniz?', this.translate('delete'), this.translate('cancel')).then((result: any) => {
      if (result.isConfirmed) {
        this.cookieService.clearAllCookies();
        this.sweetAlert.toast(this.translate('cookiesCleared'), 'success');
      }
    });
  }
}
