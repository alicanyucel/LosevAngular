# 🚀 Lösev Angular Case Study

Modern ve responsive bir Angular uygulaması. Bu proje, kullanıcı kimlik doğrulama, routing ve güvenli API entegrasyonu içeren tam kapsamlı bir web uygulamasıdır.

![Angular](https://img.shields.io/badge/Angular-19.2.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Docker](#-docker)
- [Proje Yapısı](#-proje-yapısı)
- [API Entegrasyonu](#-api-entegrasyonu)
- [Katkıda Bulunma](#-katkıda-bulunma)

## ✨ Özellikler

### 🔐 Kimlik Doğrulama
- Modern login formu tasarımı
- JWT token bazlı kimlik doğrulama
- Refresh token desteği
- Route guard koruması

### 🎨 Kullanıcı Arayüzü
- Responsive tasarım (mobile-first)
- Modern ve temiz UI/UX
- Loading states ve feedback mesajları
- 404 error sayfası

### 🛡️ Güvenlik
- Auth Guard ile route koruması
- HTTP interceptor (gelecek güncellemeler için hazır)
- XSS koruması
- CSRF token desteği (isteğe bağlı)

### 🚀 Performans
- Lazy loading ile optimizasyon
- Standalone components
- Tree shaking
- Production build optimizasyonu

## 🛠 Teknolojiler

### Frontend
- **Angular 19.2.0** - Ana framework
- **TypeScript 5.7.2** - Tip güvenli geliştirme
- **RxJS** - Reactive programming
- **Angular Router** - SPA routing
- **Angular Forms** - Form yönetimi

### UI/UX Kütüphaneleri
- **Flexi Button** - Modern buton komponenti
- **Flexi Toast** - Bildirim sistemi
- **Bootstrap Icons** - İkon seti
- **CSS Grid & Flexbox** - Layout sistemi

### Geliştirme Araçları
- **Angular CLI** - Proje yönetimi
- **Jest** - Unit testing (yapılandırılmış)
- **Karma & Jasmine** - Test environment
- **ESLint** - Code quality
- **Docker** - Containerization

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm 8+
- Angular CLI 19+

### Adım Adım Kurulum

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/alicanyucel/LosevAngular.git
   cd LosevAngular
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
