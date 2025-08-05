import { Injectable, signal, inject } from '@angular/core';
import { CookieService } from './cookie.service';

export interface LanguageData {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageData[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private cookieService = inject(CookieService);
  private currentLanguage = signal<string>('tr');
  
  private translations: { [key: string]: { [key: string]: string } } = {
    tr: {
      // Header
      'passwords': 'Şifrelerim',
      'light': 'Açık',
      'dark': 'Koyu',
      'theme': 'Tema',
      'language': 'Dil',
      
      // Buttons
      'addGroup': 'Grup Ekle',
      'search': 'Ara',
      'searchPlaceholder': 'Grup ara...',
      'update': 'Güncelle',
      'delete': 'Sil',
      'show': 'Göster',
      'hide': 'Gizle',
      'save': 'Kaydet',
      'cancel': 'İptal',
      
      // Group Management
      'addPassInGroup': 'Şifre Ekle',
      'updateGroup': 'Grubu Güncelle',
      'deleteGroup': 'Grubu Sil',
      'groupName': 'Grup Adı',
      
      // Password Management
      'passName': 'Şifre Adı',
      'url': 'URL',
      'password': 'Şifre',
      'tools': 'İşlemler',
      
      // Messages
      'newGroupCreated': 'Yeni grup oluşturuldu!',
      'groupUpdated': 'Grup adı güncellendi!',
      'groupDeleted': 'Grup silindi!',
      'passwordAdded': 'Yeni şifre eklendi!',
      'passwordUpdated': 'Şifre güncellendi!',
      'passwordDeleted': 'Şifre silindi!',
      'passwordShown': 'Şifre gösterildi',
      'passwordHidden': 'Şifre gizlendi',
      'themeChanged': 'tema aktif!',
      
      // Dialogs
      'createNewGroup': 'Yeni Grup Oluştur',
      'enterGroupName': 'Grup adını girin',
      'editGroupName': 'Grup Adını Düzenle',
      'editPasswordName': 'Şifre Adını Düzenle',
      'editPassword': 'Şifreyi Düzenle',
      'editUrl': 'URL Düzenle',
      'enterPasswordName': 'Şifre adını girin',
      'enterUrl': 'URL girin',
      'enterPassword': 'Şifreyi girin',
      'deleteConfirmGroup': 'grubunu silmek istediğinizden emin misiniz?',
      'deleteConfirmPassword': 'şifresini silmek istediğinizden emin misiniz?',
      'deleteWarningGroup': 'Bu işlem geri alınamaz ve tüm şifreler silinecek!',
      'deleteWarningPassword': 'Bu işlem geri alınamaz!',
      'fieldRequired': 'Bu alan boş bırakılamaz!',
      
      // Login
      'login': 'Giriş Yap',
      'loginSuccess': 'Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...',
      'username': 'Kullanıcı Adı',
      'email': 'E-posta',
      'loginButton': 'Giriş',

      // Cookie Management
      'cookies': 'Çerezler',
      'cookieInfo': 'Çerez Bilgisi',
      'clearCookies': 'Çerezleri Temizle',
      'cookieCount': 'Çerez sayısı',
      'cookiesCleared': 'Çerezler temizlendi!',
      'cookieDetails': 'Çerez Detayları',
      'cookieName': 'Çerez Adı',
      'cookieValue': 'Çerez Değeri',
      'noCookiesFound': 'Hiç çerez bulunamadı',
      'close': 'Kapat'
    },
    en: {
      // Header
      'passwords': 'My Passwords',
      'light': 'Light',
      'dark': 'Dark',
      'theme': 'Theme',
      'language': 'Language',
      
      // Buttons
      'addGroup': 'Add Group',
      'search': 'Search',
      'searchPlaceholder': 'Search groups...',
      'update': 'Update',
      'delete': 'Delete',
      'show': 'Show',
      'hide': 'Hide',
      'save': 'Save',
      'cancel': 'Cancel',
      
      // Group Management
      'addPassInGroup': 'Add Password',
      'updateGroup': 'Update Group',
      'deleteGroup': 'Delete Group',
      'groupName': 'Group Name',
      
      // Password Management
      'passName': 'Password Name',
      'url': 'URL',
      'password': 'Password',
      'tools': 'Actions',
      
      // Messages
      'newGroupCreated': 'New group created!',
      'groupUpdated': 'Group name updated!',
      'groupDeleted': 'Group deleted!',
      'passwordAdded': 'New password added!',
      'passwordUpdated': 'Password updated!',
      'passwordDeleted': 'Password deleted!',
      'passwordShown': 'Password shown',
      'passwordHidden': 'Password hidden',
      'themeChanged': 'theme activated!',
      
      // Dialogs
      'createNewGroup': 'Create New Group',
      'enterGroupName': 'Enter group name',
      'editGroupName': 'Edit Group Name',
      'editPasswordName': 'Edit Password Name',
      'editPassword': 'Edit Password',
      'editUrl': 'Edit URL',
      'enterPasswordName': 'Enter password name',
      'enterUrl': 'Enter URL',
      'enterPassword': 'Enter password',
      'deleteConfirmGroup': 'are you sure you want to delete the group?',
      'deleteConfirmPassword': 'are you sure you want to delete the password?',
      'deleteWarningGroup': 'This action cannot be undone and all passwords will be deleted!',
      'deleteWarningPassword': 'This action cannot be undone!',
      'fieldRequired': 'This field cannot be empty!',
      
      // Login
      'login': 'Login',
      'loginSuccess': 'Login successful! Redirecting to home page...',
      'username': 'Username',
      'email': 'Email',
      'loginButton': 'Sign In',

      // Cookie Management
      'cookies': 'Cookies',
      'cookieInfo': 'Cookie Information',
      'clearCookies': 'Clear Cookies',
      'cookieCount': 'Cookie count',
      'cookiesCleared': 'Cookies cleared!',
      'cookieDetails': 'Cookie Details',
      'cookieName': 'Cookie Name',
      'cookieValue': 'Cookie Value',
      'noCookiesFound': 'No cookies found',
      'close': 'Close'
    }
  };

  constructor() {
    // Cookie'den dil ayarını oku, yoksa LocalStorage'dan oku
    const savedLanguageFromCookie = this.cookieService.getCookie('user_language');
    const savedLanguageFromStorage = localStorage.getItem('language');
    
    let preferredLanguage = 'tr';
    
    if (savedLanguageFromCookie && this.translations[savedLanguageFromCookie]) {
      preferredLanguage = savedLanguageFromCookie;
    } else if (savedLanguageFromStorage && this.translations[savedLanguageFromStorage]) {
      preferredLanguage = savedLanguageFromStorage;
      // Storage'dan cookie'ye geçir
      this.cookieService.setCookie('user_language', preferredLanguage, 365);
    }
    
    this.currentLanguage.set(preferredLanguage);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage();
  }

  setLanguage(language: string): void {
    if (this.translations[language]) {
      this.currentLanguage.set(language);
      // Hem cookie'ye hem localStorage'a kaydet
      this.cookieService.setCookie('user_language', language, 365); // 1 yıl
      localStorage.setItem('language', language);
    }
  }

  translate(key: string): string {
    const currentLang = this.currentLanguage();
    return this.translations[currentLang]?.[key] || key;
  }

  getLanguages(): LanguageData[] {
    return LANGUAGES;
  }

  getCurrentLanguageData(): LanguageData {
    const currentLang = this.currentLanguage();
    return LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0];
  }
}
