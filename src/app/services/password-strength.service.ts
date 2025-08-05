import { Injectable } from '@angular/core';

export interface PasswordStrength {
  score: number;
  label: 'weak' | 'medium' | 'strong' | 'veryStrong';
  percentage: number; 
  color: string;
  suggestions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  constructor() { }

  checkStrength(password: string): PasswordStrength {
    if (!password) {
      return {
        score: 0,
        label: 'weak',
        percentage: 0,
        color: '#dc3545',
        suggestions: ['enterPasswordHere']
      };
    }

    let score = 0;
    const suggestions: string[] = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      suggestions.push('passwordLength');
    }
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('passwordUppercase');
    }
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('passwordLowercase');
    }
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('passwordNumber');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('passwordSpecialChar');
    }
    if (password.length >= 12) score += 0.5;
    if (password.length >= 16) score += 0.5;
    score = Math.min(score, 4);

    return this.getStrengthData(score, suggestions);
  }
  private getStrengthData(score: number, suggestions: string[]): PasswordStrength {
    if (score < 2) {
      return {
        score,
        label: 'weak',
        percentage: (score / 4) * 100,
        color: '#dc3545', 
        suggestions
      };
    } else if (score < 3) {
      return {
        score,
        label: 'medium',
        percentage: (score / 4) * 100,
        color: '#fd7e14', 
        suggestions
      };
    } else if (score < 4) {
      return {
        score,
        label: 'strong',
        percentage: (score / 4) * 100,
        color: '#198754', 
        suggestions
      };
    } else {
      return {
        score,
        label: 'veryStrong',
        percentage: 100,
        color: '#20c997', 
        suggestions
      };
    }
  }
  
  generateStrongPassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = '';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}
