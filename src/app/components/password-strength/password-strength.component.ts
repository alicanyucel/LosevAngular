import { Component, Input, inject, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthService, PasswordStrength } from '../../services/password-strength.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="password-strength-container" *ngIf="password">
      <div class="row">
        <div class="col-md-6">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="strength-label">
              <i class="fa fa-shield-alt me-2"></i>
              {{ 'passwordStrength' | translate }}:
            </span>
            <span 
              class="strength-value" 
              [style.color]="strength.color">
              {{ strength.label | translate }}
            </span>
          </div>
          
          <div class="progress mb-3">
            <div 
              class="progress-bar transition-smooth" 
              [style.width.%]="strength.percentage"
              [style.background-color]="strength.color"
              role="progressbar">
            </div>
          </div>
          
          <button 
            *ngIf="showGenerateButton"
            (click)="generatePassword()"
            class="btn btn-outline-primary w-100"
            type="button">
            <i class="fa fa-magic me-2"></i>
            {{ 'generatePassword' | translate }}
          </button>
        </div>
        
        <div class="col-md-6" *ngIf="strength.suggestions.length > 0 && showSuggestions">
          <div class="suggestions">
            <div class="suggestions-header mb-3">
              <i class="fa fa-lightbulb me-2"></i>
              <strong>{{ 'suggestions' | translate }}:</strong>
            </div>
            <ul class="suggestion-list mb-0">
              <li 
                *ngFor="let suggestion of strength.suggestions" 
                class="suggestion-item">
                <i class="fa fa-circle me-2" style="font-size: 6px;"></i>
                {{ suggestion | translate }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .password-strength-container {
      padding: 1.5rem;
      background-color: rgba(var(--bs-light-rgb), 0.1);
      border-radius: 0.5rem;
      border: 2px solid rgba(var(--bs-border-color-rgb), 0.175);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      min-height: 200px;
    }
    
    [data-bs-theme="dark"] .password-strength-container {
      background-color: rgba(var(--bs-dark-rgb), 0.3);
      border-color: rgba(var(--bs-light-rgb), 0.2);
    }
    
    .strength-label {
      font-size: 1.5rem;
      color: var(--bs-body-color);
      font-weight: 700;
    }
    
    .strength-value {
      font-size: 1.8rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
    }
    
    .progress {
      background-color: rgba(var(--bs-secondary-rgb), 0.2);
      height: 25px !important;
      border-radius: 12px;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }
    
    .progress-bar {
      transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    .transition-smooth {
      transition: all 0.5s ease-in-out;
    }
    
    .suggestions {
      background-color: rgba(var(--bs-info-rgb), 0.1);
      border-left: 4px solid var(--bs-info);
      padding: 1rem;
      border-radius: 0.375rem;
      height: 100%;
    }
    
    .suggestions-header {
      color: var(--bs-info);
      font-size: 1.4rem;
      font-weight: 700;
    }
    
    .suggestion-list {
      list-style: none;
      padding-left: 0;
    }
    
    .suggestion-item {
      margin-bottom: 1rem;
      padding: 0.75rem 0;
      font-size: 1.2rem;
      line-height: 1.6;
      color: var(--bs-body-color);
      border-bottom: 1px solid rgba(var(--bs-border-color-rgb), 0.1);
      font-weight: 500;
    }
    
    .suggestion-item:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
    
    .btn {
      font-size: 1.3rem;
      padding: 1rem 2rem;
      border-radius: 0.6rem;
      font-weight: 700;
      transition: all 0.3s ease;
    }
    
    .btn-outline-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--bs-primary-rgb), 0.3);
    }
    
    .fa {
      font-size: 1.4em;
    }
    
    .row {
      align-items: stretch;
    }
    
    .col-md-6 {
      display: flex;
      flex-direction: column;
    }
    
    .col-md-6:first-child {
      justify-content: space-between;
    }
    
    @media (max-width: 768px) {
      .password-strength-container {
        padding: 1rem;
        min-height: auto;
      }
      
      .strength-label {
        font-size: 1.2rem;
      }
      
      .strength-value {
        font-size: 1.5rem;
      }
      
      .progress {
        height: 20px !important;
      }
      
      .btn {
        font-size: 1.1rem;
        padding: 0.8rem 1.5rem;
      }
      
      .suggestion-item {
        font-size: 1rem;
      }
      
      .suggestions-header {
        font-size: 1.2rem;
      }
    }
  `]
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password: string = '';
  @Input() showSuggestions: boolean = true;
  @Input() showGenerateButton: boolean = false;
  @Output() passwordGenerated = new EventEmitter<string>();
  
  strength: PasswordStrength = {
    score: 0,
    label: 'weak',
    percentage: 0,
    color: '#dc3545',
    suggestions: []
  };
  
  private passwordStrengthService = inject(PasswordStrengthService);
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) {
      this.updateStrength();
    }
  }
  
  private updateStrength() {
    this.strength = this.passwordStrengthService.checkStrength(this.password);
  }
  
  generatePassword() {
    const newPassword = this.passwordStrengthService.generateStrongPassword(12);
    this.passwordGenerated.emit(newPassword);
  }
}
