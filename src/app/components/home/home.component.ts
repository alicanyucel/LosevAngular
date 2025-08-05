import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { SearchGroupPipe } from '../../pipes/search-group.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, SearchGroupPipe]
})
export class HomeComponent {
  private sweetAlert = inject(SweetAlertService);
  username = 'Test';
  searchTerm = '';
  isDarkTheme = false;

  constructor() {
    // LocalStorage'dan tema durumunu oku
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
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
      this.sweetAlert.toast('Şifre gösterildi', 'info');
    } else {
      this.sweetAlert.toast('Şifre gizlendi', 'info');
    }
  }

  createNewGroup() {
    this.sweetAlert.input('Yeni Grup Oluştur', 'Grup adını girin').then((result: any) => {
      if (result.isConfirmed && result.value) {
        this.groups.push({ name: result.value.trim(), passwords: [] });
        this.sweetAlert.toast('Yeni grup oluşturuldu!', 'success');
      }
    });
  }

  addPass(group: any) {
    this.sweetAlert.input('Şifre Adı', 'Şifre adını girin').then((nameResult: any) => {
      if (nameResult.isConfirmed && nameResult.value) {
        this.sweetAlert.input('URL', 'URL girin').then((urlResult: any) => {
          if (urlResult.isConfirmed && urlResult.value) {
            this.sweetAlert.input('Şifre', 'Şifreyi girin', '', 'password').then((passResult: any) => {
              if (passResult.isConfirmed && passResult.value) {
                group.passwords.push({ 
                  name: nameResult.value.trim(), 
                  url: urlResult.value.trim(), 
                  password: passResult.value, 
                  show: false 
                });
                this.sweetAlert.toast('Yeni şifre eklendi!', 'success');
              }
            });
          }
        });
      }
    });
  }

  editPass(pass: any) {
    this.sweetAlert.input('Şifre Adını Düzenle', 'Şifre adını girin', pass.name).then((nameResult: any) => {
      if (nameResult.isConfirmed && nameResult.value) {
        this.sweetAlert.input('URL Düzenle', 'URL girin', pass.url).then((urlResult: any) => {
          if (urlResult.isConfirmed && urlResult.value) {
            this.sweetAlert.input('Şifreyi Düzenle', 'Şifreyi girin', pass.password, 'password').then((passResult: any) => {
              if (passResult.isConfirmed && passResult.value) {
                pass.name = nameResult.value.trim();
                pass.url = urlResult.value.trim();
                pass.password = passResult.value;
                this.sweetAlert.toast('Şifre güncellendi!', 'success');
              }
            });
          }
        });
      }
    });
  }

  deletePass(group: any, pass: any) {
    this.sweetAlert.deleteConfirm(`"${pass.name}" şifresini silmek istediğinizden emin misiniz?`, 'Bu işlem geri alınamaz!').then((result: any) => {
      if (result.isConfirmed) {
        const index = group.passwords.indexOf(pass);
        if (index !== -1) {
          group.passwords.splice(index, 1);
          this.sweetAlert.toast('Şifre silindi!', 'success');
        }
      }
    });
  }

  editGroup(group: any) {
    this.sweetAlert.input('Grup Adını Düzenle', 'Grup adını girin', group.name).then((result: any) => {
      if (result.isConfirmed && result.value) {
        group.name = result.value.trim();
        this.sweetAlert.toast('Grup adı güncellendi!', 'success');
      }
    });
  }

  deleteGroup(group: any) {
    this.sweetAlert.deleteConfirm(`"${group.name}" grubunu silmek istediğinizden emin misiniz?`, 'Bu işlem geri alınamaz ve tüm şifreler silinecek!').then((result: any) => {
      if (result.isConfirmed) {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
          this.groups.splice(index, 1);
          this.sweetAlert.toast('Grup silindi!', 'success');
        }
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.sweetAlert.toast(`${this.isDarkTheme ? 'Dark' : 'Light'} tema aktif!`, 'info');
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
}
