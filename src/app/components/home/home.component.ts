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
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { CsvService, PasswordData } from '../../services/csv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, SearchGroupPipe, TranslatePipe, BreadcrumbComponent, PasswordStrengthComponent]
})
export class HomeComponent {
  private sweetAlert = inject(SweetAlertService);
  private i18n = inject(I18nService);
  private cookieService = inject(CookieService);
  private breadcrumbService = inject(BreadcrumbService);
  private csvService = inject(CsvService);
  
  username = 'Test';
  searchTerm = '';
  isDarkTheme = false;
  languages = LANGUAGES;
  currentPassword = '';
  showTestPassword = false; 

  constructor() {

    this.breadcrumbService.reset();
    this.breadcrumbService.add('passwords', '/home', 'key');
    const savedThemeFromCookie = this.cookieService.getCookie('user_theme');
    const savedThemeFromStorage = localStorage.getItem('theme');
    
    if (savedThemeFromCookie) {
      this.isDarkTheme = savedThemeFromCookie === 'dark';
    } else if (savedThemeFromStorage) {
      this.isDarkTheme = savedThemeFromStorage === 'dark';
      this.cookieService.setCookie('user_theme', savedThemeFromStorage, 365);
    }
    
    this.applyTheme();
  }

  onPasswordGenerated(password: string) {
    this.currentPassword = password;
    this.sweetAlert.toast(this.translate('passwordGenerated'), 'success');
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
    const html = `
      <div class="row g-3">
        <div class="col-12">
          <label for="swal-input-name" class="form-label">${this.translate('passName')}</label>
          <input id="swal-input-name" class="form-control" placeholder="${this.translate('enterPasswordName')}" />
        </div>
        <div class="col-12">
          <label for="swal-input-url" class="form-label">${this.translate('url')}</label>
          <input id="swal-input-url" class="form-control" placeholder="${this.translate('enterUrl')}" />
        </div>
        <div class="col-12">
          <label for="swal-input-password" class="form-label">${this.translate('password')}</label>
          <div class="input-group">
            <input id="swal-input-password" type="password" class="form-control" placeholder="${this.translate('enterPassword')}" />
            <button type="button" class="btn btn-outline-secondary" onclick="
              const input = document.getElementById('swal-input-password');
              const icon = this.querySelector('i');
              if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa fa-eye-slash';
              } else {
                input.type = 'password';
                icon.className = 'fa fa-eye';
              }
            ">
              <i class="fa fa-eye"></i>
            </button>
          </div>
          <div id="password-strength-indicator" class="mt-2"></div>
        </div>
      </div>
      <script>
        document.getElementById('swal-input-password').addEventListener('input', function() {
          const password = this.value;
          const indicator = document.getElementById('password-strength-indicator');
          
          if (password) {
            let score = 0;
            let color = '#dc3545';
            let label = '${this.translate('weak')}';
            
            // Basit parola gücü kontrolü
            if (password.length >= 8) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[a-z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;
            
            if (score >= 4) {
              color = '#198754';
              label = '${this.translate('strong')}';
            } else if (score >= 3) {
              color = '#fd7e14';
              label = '${this.translate('medium')}';
            }
            
            const percentage = (score / 5) * 100;
            
            indicator.innerHTML = \`
              <div class="d-flex justify-content-between align-items-center mb-1">
                <small>${this.translate('passwordStrength')}:</small>
                <small style="color: \${color}; font-weight: bold;">\${label}</small>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar" style="width: \${percentage}%; background-color: \${color};"></div>
              </div>
            \`;
          } else {
            indicator.innerHTML = '';
          }
        });
      </script>
    `;
    
    this.sweetAlert.customInput(
      this.translate('addPassInGroup'), 
      html,
      this.translate('save'),
      this.translate('cancel')
    ).then((result: any) => {
      if (result.isConfirmed && result.value) {
        group.passwords.push({ 
          name: result.value.name, 
          url: result.value.url, 
          password: result.value.password, 
          show: false 
        });
        this.sweetAlert.toast(this.translate('passwordAdded'), 'success');
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

  showCookies() {
    const cookies = this.cookieService.getAllCookies();
    console.log('Tüm Cookie\'ler:', cookies);
    
    if (Object.keys(cookies).length === 0) {
      this.sweetAlert.info(this.translate('cookieInfo'), this.translate('noCookiesFound'));
      return;
    }
    
    let cookieDetails = `${this.translate('cookieCount')}: ${Object.keys(cookies).length}\n\n`;
    
    for (const [name, value] of Object.entries(cookies)) {
      cookieDetails += `${this.translate('cookieName')}: ${name}\n`;
      cookieDetails += `${this.translate('cookieValue')}: ${value}\n\n`;
    }
    
    this.sweetAlert.info(this.translate('cookieDetails'), cookieDetails);
  }

  clearCookies() {
    this.sweetAlert.confirm(this.translate('clearCookies'), 'Tüm cookie\'ler silinecek. Emin misiniz?', this.translate('delete'), this.translate('cancel')).then((result: any) => {
      if (result.isConfirmed) {
        this.cookieService.clearAllCookies();
        this.sweetAlert.toast(this.translate('cookiesCleared'), 'success');
      }
    });
  }

  // CSV Import/Export Methods
  exportToCSV() {
    if (this.groups.length === 0) {
      this.sweetAlert.toast('No passwords to export', 'warning');
      return;
    }

    try {
      const filename = `passwords_${new Date().toISOString().split('T')[0]}`;
      this.csvService.exportToCSV(this.groups, filename);
      this.sweetAlert.toast(this.translate('csvExported'), 'success');
    } catch (error) {
      console.error('Export error:', error);
      this.sweetAlert.toast(this.translate('csvImportError'), 'error');
    }
  }

  importFromCSV() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.style.display = 'none';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) {
        this.sweetAlert.toast(this.translate('csvFileNotSelected'), 'warning');
        return;
      }

      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        this.sweetAlert.toast(this.translate('csvInvalidFormat'), 'error');
        return;
      }

      this.sweetAlert.confirm(
        this.translate('csvImportConfirm'),
        this.translate('csvImportMessage'),
        this.translate('save'),
        this.translate('cancel')
      ).then((result: any) => {
        if (result.isConfirmed) {
          this.processCSVImport(file);
        }
      });
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  private async processCSVImport(file: File) {
    try {
      const importedData: PasswordData[] = await this.csvService.importFromCSV(file);
      
      const validation = this.csvService.validateCSVStructure(importedData);
      if (!validation.isValid) {
        let errorMessage = this.translate('csvValidationError') + ':\n\n';
        validation.errors.forEach(error => {
          errorMessage += `• ${error}\n`;
        });
        this.sweetAlert.error(this.translate('csvImportError'), errorMessage);
        return;
      }

      if (importedData.length === 0) {
        this.sweetAlert.toast('CSV file is empty', 'warning');
        return;
      }
      this.groups = this.csvService.mergeImportedData(this.groups, importedData);
      
      this.sweetAlert.toast(
        `${this.translate('csvImported')} (${importedData.length} ${this.translate('passwords')})`,
        'success'
      );
    } catch (error) {
      console.error('Import error:', error);
      this.sweetAlert.toast(this.translate('csvImportError'), 'error');
    }
  }
}
