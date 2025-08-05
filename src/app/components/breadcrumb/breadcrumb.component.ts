import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li 
          *ngFor="let item of breadcrumbService.data(); let last = last" 
          class="breadcrumb-item"
          [class.active]="last">
          <ng-container *ngIf="!last">
            <a [routerLink]="item.routerLink" class="text-decoration-none">
              <i [class]="'fa fa-' + item.icon + ' me-1'"></i>
              {{ item.name | translate }}
            </a>
          </ng-container>
          <ng-container *ngIf="last">
            <i [class]="'fa fa-' + item.icon + ' me-1'"></i>
            {{ item.name | translate }}
          </ng-container>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      background-color: rgba(var(--bs-light-rgb), 0.15);
      border-radius: 0.375rem;
      padding: 0.75rem 1rem;
      margin-bottom: 0;
      border: 1px solid rgba(var(--bs-border-color-rgb), 0.175);
    }
    
    [data-bs-theme="dark"] .breadcrumb {
      background-color: rgba(var(--bs-dark-rgb), 0.5);
      border-color: rgba(var(--bs-border-color-rgb), 0.275);
    }
    
    .breadcrumb-item a {
      color: var(--bs-primary);
      transition: all 0.15s ease-in-out;
    }
    
    .breadcrumb-item a:hover {
      color: var(--bs-primary-emphasis);
      text-decoration: underline !important;
    }
    
    .breadcrumb-item.active {
      color: var(--bs-body-color);
      font-weight: 500;
    }
    
    .breadcrumb-item + .breadcrumb-item::before {
      content: ">";
      color: var(--bs-secondary);
      font-weight: 600;
    }
    
    .breadcrumb-item i {
      opacity: 0.8;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbService = inject(BreadcrumbService);
  private i18n = inject(I18nService);
  
  ngOnInit() {
    // Dil değişikliklerini dinle ve breadcrumb'u güncelle
    // Bu, reactive olarak çalışacak
  }
}
