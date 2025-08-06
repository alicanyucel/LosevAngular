# Test Documentation

## Running Tests

### Unit Tests
```bash
# Run all tests
ng test

# Run tests in watch mode
ng test --watch

# Run tests with code coverage
ng test --code-coverage

# Run tests once (CI mode)
ng test --watch=false --browsers=ChromeHeadless
```

### Home Component Tests

The `HomeComponent` test suite covers:

#### 🔧 **Component Initialization**
- ✅ Component creation
- ✅ Default values initialization
- ✅ Breadcrumb setup
- ✅ Theme loading from cookies

#### 🔐 **Password Management**
- ✅ Toggle password visibility
- ✅ Add password to group
- ✅ Edit password properties
- ✅ Delete password from group

#### 📁 **Group Management**
- ✅ Create new group
- ✅ Edit group name
- ✅ Delete group with passwords

#### 🌙 **Theme Management**
- ✅ Toggle between dark/light themes
- ✅ Apply theme to DOM elements
- ✅ Save theme preference to cookies

#### 🌐 **Language Management**
- ✅ Get current language data
- ✅ Change application language
- ✅ Translate text keys

#### 🍪 **Cookie Management**
- ✅ Display cookie information
- ✅ Clear all cookies with confirmation

#### 📊 **CSV Import/Export**
- ✅ Export passwords to CSV format
- ✅ Handle export errors
- ✅ Import CSV files
- ✅ Validate CSV structure
- ✅ Handle import errors

#### 🎲 **Password Generation**
- ✅ Handle generated password events

#### 🔍 **Search Functionality**
- ✅ Filter groups by search term

#### ⚠️ **Error Handling**
- ✅ Handle empty group exports
- ✅ Handle CSV import failures
- ✅ Handle validation errors

## Test Coverage Goals

| Component | Coverage Target | Current Status |
|-----------|----------------|----------------|
| HomeComponent | 90%+ | ✅ Implemented |
| Services | 85%+ | 🟡 Pending |
| Pipes | 95%+ | 🟡 Pending |
| Guards | 100% | 🟡 Pending |

## Mock Objects

Tests use comprehensive mock objects for:
- `SweetAlertService` - Dialog interactions
- `I18nService` - Internationalization
- `CookieService` - Browser storage
- `BreadcrumbService` - Navigation
- `CsvService` - File operations

## Test Helpers

The `TestHelpers` class provides utility functions for:
- Creating mock data objects
- Setting up test fixtures
- Common assertion patterns
- File mocking utilities

## Best Practices

1. **Arrange-Act-Assert** pattern
2. **Descriptive test names**
3. **Mock external dependencies**
4. **Test both success and error paths**
5. **Use helper functions for common setup**
6. **Test user interactions**
7. **Verify service method calls**

## Running Tests in CI/CD

```bash
# For continuous integration
ng test --watch=false --browsers=ChromeHeadless --code-coverage
```

## Code Coverage Reports

Coverage reports are generated in the `coverage/` directory and include:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage
