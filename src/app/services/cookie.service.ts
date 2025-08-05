import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  /**
   * Cookie ayarlar
   * @param name Cookie adı
   * @param value Cookie değeri
   * @param days Kaç gün geçerli olacağı (varsayılan: 30)
   * @param path Cookie path'i (varsayılan: '/')
   */
  setCookie(name: string, value: string, days: number = 30, path: string = '/'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}; SameSite=Lax`;
  }

  /**
   * Cookie değeri okur
   * @param name Cookie adı
   * @returns Cookie değeri veya null
   */
  getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  /**
   * Cookie siler
   * @param name Cookie adı
   * @param path Cookie path'i (varsayılan: '/')
   */
  deleteCookie(name: string, path: string = '/'): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=${path}`;
  }

  /**
   * Tüm cookie'leri listeler
   * @returns Cookie objesi
   */
  getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      const eqPos = c.indexOf('=');
      if (eqPos > 0) {
        const name = c.substring(0, eqPos);
        const value = c.substring(eqPos + 1);
        cookies[name] = value;
      }
    }
    return cookies;
  }

  /**
   * Cookie var mı kontrol eder
   * @param name Cookie adı
   * @returns Boolean
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  /**
   * Tüm cookie'leri temizler
   */
  clearAllCookies(): void {
    const cookies = this.getAllCookies();
    for (const cookieName in cookies) {
      this.deleteCookie(cookieName);
    }
  }
}
