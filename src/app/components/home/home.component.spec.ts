import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { I18nService } from '../../services/i18n.service';
import { CookieService } from '../../services/cookie.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { CsvService } from '../../services/csv.service';
import { SearchGroupPipe } from '../../pipes/search-group.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TestHelpers } from '../../testing/test-helpers';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockSweetAlertService: jasmine.SpyObj<SweetAlertService>;
  let mockI18nService: jasmine.SpyObj<I18nService>;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockBreadcrumbService: jasmine.SpyObj<BreadcrumbService>;
  let mockCsvService: jasmine.SpyObj<CsvService>;

  beforeEach(async () => {
    // Mock services
    mockSweetAlertService = jasmine.createSpyObj('SweetAlertService', [
      'toast', 'input', 'confirm', 'deleteConfirm', 'customInput', 'info'
    ]);
    
    mockI18nService = jasmine.createSpyObj('I18nService', [
      'translate', 'getCurrentLanguageData', 'setLanguage'
    ]);
    
    mockCookieService = jasmine.createSpyObj('CookieService', [
      'getCookie', 'setCookie', 'getAllCookies', 'clearAllCookies'
    ]);
    
    mockBreadcrumbService = jasmine.createSpyObj('BreadcrumbService', [
      'reset', 'add'
    ]);
    
    mockCsvService = jasmine.createSpyObj('CsvService', [
      'exportToCSV', 'importFromCSV', 'validateCSVStructure', 'mergeImportedData'
    ]);

    // Setup default return values
    mockI18nService.translate.and.returnValue('Translated Text');
    mockI18nService.getCurrentLanguageData.and.returnValue(TestHelpers.createMockLanguageData());
    mockCookieService.getCookie.and.returnValue('light');
    mockCookieService.getAllCookies.and.returnValue({});
    mockSweetAlertService.toast.and.returnValue(Promise.resolve());
    mockSweetAlertService.input.and.returnValue(TestHelpers.createMockSweetAlertResult(true, 'test'));
    mockSweetAlertService.confirm.and.returnValue(TestHelpers.createMockSweetAlertResult(true));
    mockSweetAlertService.deleteConfirm.and.returnValue(TestHelpers.createMockSweetAlertResult(true));
    mockSweetAlertService.customInput.and.returnValue(Promise.resolve({ 
      isConfirmed: true, 
      value: { name: 'test', url: 'test.com', password: 'test123' }
    }));
    mockCsvService.importFromCSV.and.returnValue(Promise.resolve([]));
    mockCsvService.validateCSVStructure.and.returnValue({ isValid: true, errors: [] });
    mockCsvService.mergeImportedData.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        CommonModule,
        FormsModule,
        SearchGroupPipe,
        TranslatePipe,
        BreadcrumbComponent,
        PasswordStrengthComponent
      ],
      providers: [
        { provide: SweetAlertService, useValue: mockSweetAlertService },
        { provide: I18nService, useValue: mockI18nService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: BreadcrumbService, useValue: mockBreadcrumbService },
        { provide: CsvService, useValue: mockCsvService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize default values', () => {
      expect(component.username).toBe('Test');
      expect(component.searchTerm).toBe('');
      expect(component.isDarkTheme).toBe(false);
      expect(component.currentPassword).toBe('');
      expect(component.showTestPassword).toBe(false);
    });

    it('should setup breadcrumb on init', () => {
      expect(mockBreadcrumbService.reset).toHaveBeenCalled();
      expect(mockBreadcrumbService.add).toHaveBeenCalledWith('passwords', '/home', 'key');
    });

    it('should load theme from cookie', () => {
      expect(mockCookieService.getCookie).toHaveBeenCalledWith('user_theme');
    });
  });

  describe('Password Management', () => {
    it('should toggle password visibility', () => {
      const password = { show: false };
      component.toggleShow(password);

      expect(password.show).toBe(true);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'info');
    });

    it('should add password to group', async () => {
      const group = TestHelpers.createMockGroup();
      const initialLength = group.passwords.length;
      
      await component.addPass(group);

      expect(mockSweetAlertService.customInput).toHaveBeenCalled();
      expect(group.passwords.length).toBe(initialLength + 1);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });

    it('should edit password', async () => {
      const password = TestHelpers.createMockPassword();
      
      await component.editPass(password);

      expect(mockSweetAlertService.input).toHaveBeenCalledTimes(3);
      expect(password.name).toBe('test');
      expect(password.url).toBe('test');
      expect(password.password).toBe('test');
    });

    it('should delete password from group', async () => {
      const group = TestHelpers.createMockGroup();
      const password = group.passwords[0];
      
      await component.deletePass(group, password);

      expect(mockSweetAlertService.deleteConfirm).toHaveBeenCalled();
      expect(group.passwords.length).toBe(0);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });
  });

  describe('Group Management', () => {
    it('should create new group', async () => {
      const initialGroupsLength = component.groups.length;
      
      await component.createNewGroup();

      expect(mockSweetAlertService.input).toHaveBeenCalled();
      expect(component.groups.length).toBe(initialGroupsLength + 1);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });

    it('should edit group name', async () => {
      const group = { name: 'oldName' };
      
      await component.editGroup(group);

      expect(mockSweetAlertService.input).toHaveBeenCalled();
      expect(group.name).toBe('test');
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });

    it('should delete group', async () => {
      const group = TestHelpers.createMockGroup('testGroup');
      component.groups.push(group);
      const initialLength = component.groups.length;
      
      await component.deleteGroup(group);

      expect(mockSweetAlertService.deleteConfirm).toHaveBeenCalled();
      expect(component.groups.length).toBe(initialLength - 1);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });
  });

  describe('Theme Management', () => {
    it('should toggle theme', () => {
      const initialTheme = component.isDarkTheme;
      
      component.toggleTheme();

      expect(component.isDarkTheme).toBe(!initialTheme);
      expect(mockCookieService.setCookie).toHaveBeenCalledWith('user_theme', jasmine.any(String), 365);
      expect(mockSweetAlertService.toast).toHaveBeenCalled();
    });

    it('should apply dark theme', () => {
      component.isDarkTheme = true;
      spyOn(document.body, 'setAttribute');
      spyOn(document.body.classList, 'add');
      
      component.applyTheme();

      expect(document.body.setAttribute).toHaveBeenCalledWith('data-bs-theme', 'dark');
      expect(document.body.classList.add).toHaveBeenCalledWith('bg-dark', 'text-light');
    });

    it('should apply light theme', () => {
      component.isDarkTheme = false;
      spyOn(document.body, 'removeAttribute');
      spyOn(document.body.classList, 'remove');
      
      component.applyTheme();

      expect(document.body.removeAttribute).toHaveBeenCalledWith('data-bs-theme');
      expect(document.body.classList.remove).toHaveBeenCalledWith('bg-dark', 'text-light');
    });
  });

  describe('Language Management', () => {
    it('should get current language', () => {
      const language = component.getCurrentLanguage();

      expect(mockI18nService.getCurrentLanguageData).toHaveBeenCalled();
      expect(language).toEqual(TestHelpers.createMockLanguageData());
    });

    it('should change language', () => {
      component.changeLanguage('en');

      expect(mockI18nService.setLanguage).toHaveBeenCalledWith('en');
      expect(mockSweetAlertService.toast).toHaveBeenCalled();
    });

    it('should translate text', () => {
      const result = component.translate('test');

      expect(mockI18nService.translate).toHaveBeenCalledWith('test');
      expect(result).toBe('Translated Text');
    });
  });

  describe('Cookie Management', () => {
    it('should show cookies', () => {
      component.showCookies();

      expect(mockCookieService.getAllCookies).toHaveBeenCalled();
      expect(mockSweetAlertService.info).toHaveBeenCalled();
    });

    it('should clear cookies', async () => {
      await component.clearCookies();

      expect(mockSweetAlertService.confirm).toHaveBeenCalled();
      expect(mockCookieService.clearAllCookies).toHaveBeenCalled();
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });
  });

  describe('CSV Import/Export', () => {
    it('should export to CSV', () => {
      component.exportToCSV();

      expect(mockCsvService.exportToCSV).toHaveBeenCalledWith(
        component.groups, 
        jasmine.stringMatching(/passwords_\d{4}-\d{2}-\d{2}/)
      );
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });

    it('should handle CSV export error', () => {
      mockCsvService.exportToCSV.and.throwError('Export error');
      spyOn(console, 'error');
      
      component.exportToCSV();

      expect(console.error).toHaveBeenCalledWith('Export error:', jasmine.any(Error));
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'error');
    });

    it('should import from CSV', () => {
      spyOn(document, 'createElement').and.returnValue({
        type: '',
        accept: '',
        style: { display: '' },
        onchange: null,
        click: jasmine.createSpy('click')
      } as any);
      spyOn(document.body, 'appendChild');
      spyOn(document.body, 'removeChild');

      component.importFromCSV();

      expect(document.createElement).toHaveBeenCalledWith('input');
    });

    it('should process CSV import successfully', async () => {
      const mockFile = TestHelpers.createMockFile('test csv content');
      const importedData = TestHelpers.createMockCSVData();
      
      mockCsvService.importFromCSV.and.returnValue(Promise.resolve(importedData));
      mockCsvService.mergeImportedData.and.returnValue([...component.groups]);

      await component['processCSVImport'](mockFile);

      expect(mockCsvService.importFromCSV).toHaveBeenCalledWith(mockFile);
      expect(mockCsvService.validateCSVStructure).toHaveBeenCalledWith(importedData);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith(
        jasmine.stringContaining('Translated Text'),
        'success'
      );
    });

    it('should handle CSV import validation error', async () => {
      const mockFile = TestHelpers.createMockFile('invalid csv');
      const importedData = [{ group: '', name: '', url: '', password: '' }];
      
      mockCsvService.importFromCSV.and.returnValue(Promise.resolve(importedData));
      mockCsvService.validateCSVStructure.and.returnValue({
        isValid: false,
        errors: ['Group name is required']
      });

      await component['processCSVImport'](mockFile);

      expect(mockSweetAlertService.error).toHaveBeenCalled();
    });
  });

  describe('Password Generation', () => {
    it('should handle password generation', () => {
      const newPassword = 'GeneratedPassword123!';
      
      component.onPasswordGenerated(newPassword);

      expect(component.currentPassword).toBe(newPassword);
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'success');
    });
  });

  describe('Search Functionality', () => {
    it('should filter groups based on search term', () => {
      component.searchTerm = 'Web';
      fixture.detectChanges();
      expect(component.searchTerm).toBe('Web');
    });
  });

  describe('Error Handling', () => {
    it('should handle export error when no groups exist', () => {
      component.groups = [];
      
      component.exportToCSV();

      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('No passwords to export', 'warning');
      expect(mockCsvService.exportToCSV).not.toHaveBeenCalled();
    });

    it('should handle CSV import error', async () => {
      const mockFile = TestHelpers.createMockFile('invalid csv');
      mockCsvService.importFromCSV.and.returnValue(Promise.reject(new Error('Import failed')));
      spyOn(console, 'error');

      await component['processCSVImport'](mockFile);

      expect(console.error).toHaveBeenCalledWith('Import error:', jasmine.any(Error));
      expect(mockSweetAlertService.toast).toHaveBeenCalledWith('Translated Text', 'error');
    });
  });

  describe('Component Integration', () => {
    it('should have required imports', () => {
      expect(component).toBeTruthy();
      const searchGroupPipe = TestBed.inject(SearchGroupPipe);
      expect(searchGroupPipe).toBeTruthy();
    });

    it('should initialize with default groups', () => {
      expect(component.groups).toBeDefined();
      expect(component.groups.length).toBeGreaterThan(0);
      expect(component.groups[0].name).toBeDefined();
      expect(component.groups[0].passwords).toBeDefined();
    });
  });
});
