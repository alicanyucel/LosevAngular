// Test Helper Functions
export class TestHelpers {
  static createMockGroup(name: string = 'Test Group') {
    return {
      name,
      passwords: [
        {
          name: 'Test Password',
          url: 'https://test.com',
          password: 'testPass123',
          show: false
        }
      ]
    };
  }

  static createMockPassword(name: string = 'Test Password') {
    return {
      name,
      url: 'https://test.com',
      password: 'testPass123',
      show: false
    };
  }

  static createMockCSVData() {
    return [
      {
        group: 'Web',
        name: 'Gmail',
        url: 'https://gmail.com',
        password: 'gmail123'
      },
      {
        group: 'Social',
        name: 'Facebook',
        url: 'https://facebook.com',
        password: 'facebook123'
      }
    ];
  }

  static createMockFile(content: string, filename: string = 'test.csv', type: string = 'text/csv') {
    return new File([content], filename, { type });
  }

  static createMockLanguageData() {
    return {
      code: 'tr',
      name: 'Türkçe',
      flag: '🇹🇷'
    };
  }

  static expectElementToExist(fixture: any, selector: string) {
    const element = fixture.debugElement.nativeElement.querySelector(selector);
    expect(element).toBeTruthy();
    return element;
  }

  static expectElementToHaveText(fixture: any, selector: string, expectedText: string) {
    const element = fixture.debugElement.nativeElement.querySelector(selector);
    expect(element?.textContent?.trim()).toContain(expectedText);
  }

  static createMockSweetAlertResult(isConfirmed: boolean = true, value?: any) {
    return Promise.resolve({
      isConfirmed,
      value: value || 'mock value'
    });
  }

  static createMockEvent(type: string = 'click', target?: any) {
    return {
      type,
      target: target || {},
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    };
  }
}
