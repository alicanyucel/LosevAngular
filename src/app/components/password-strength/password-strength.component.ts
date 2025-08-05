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
      <div class="d-flex align-items-center justify-content-between mb-1">
        <span class="strength-label">
          <i class="fa fa-shield-alt me-1"></i>
          {{ 'passwordStrength' | translate }}:
        </span>
        <span 
          class="strength-value" 
          [style.color]="strength.color">
          {{ strength.label | translate }}
        </span>
      </div>
      
      <div class="progress mb-2" style="height: 6px;">
        <div 
          class="progress-bar transition-smooth" 
          [style.width.%]="strength.percentage"
          [style.background-color]="strength.color"
          role="progressbar">
        </div>
      </div>
      
      <div *ngIf="strength.suggestions.length > 0 && showSuggestions" class="suggestions">
        <small class="text-muted">
          <i class="fa fa-lightbulb me-1"></i>
          {{ 'suggestions' | translate }}:
        </small>
        <ul class="suggestion-list mb-0 mt-1">
          <li 
            *ngFor="let suggestion of strength.suggestions" 
            class="suggestion-item">
            <small class="text-muted">
              <i class="fa fa-circle text-muted me-1" style="font-size: 4px;"></i>
              {{ suggestion | translate }}
            </small>
          </li>
        </ul>
      </div>
      
      <button 
        *ngIf="showGenerateButton"
        (click)="generatePassword()"
        class="btn btn-sm btn-outline-primary mt-2 w-100"
        type="button">
        <i class="fa fa-magic me-1"></i>
        {{ 'generatePassword' | translate }}
      </button>
    </div>
  `,
  styles: [`
    .password-strength-container {
      padding: 0.5rem;
      background-color: rgba(var(--bs-light-rgb), 0.1);
      border-radius: 0.25rem;
      border: 1px solid rgba(var(--bs-border-color-rgb), 0.175);
    }
    
    [data-bs-theme="dark"] .password-strength-container {
      background-color: rgba(var(--bs-dark-rgb), 0.3);
    }
    
    .strength-label {
      font-size: 0.75rem;
      color: var(--bs-body-color);
    }
    
    .strength-value {
      font-size: 0.75rem;
      text-transform: capitalize;
      font-weight: 600;
    }
    
    .progress {
      background-color: rgba(var(--bs-secondary-rgb), 0.2);
      height: 6px !important;
    }
    
    .progress-bar {
      transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
    }
    
    .transition-smooth {
      transition: all 0.3s ease-in-out;
    }
    
    .suggestions {
      border-top: 1px solid rgba(var(--bs-border-color-rgb), 0.175);
      padding-top: 0.375rem;
      margin-top: 0.375rem;
    }
    
    .suggestion-list {
      list-style: none;
      padding-left: 0;
    }
    
    .suggestion-item {
      margin-bottom: 0.125rem;
    }
    
    .suggestion-item:last-child {
      margin-bottom: 0;
    }
    
    .suggestion-item small {
      font-size: 0.7rem;
    }
    
    .btn-sm {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }
    
    .btn-outline-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
