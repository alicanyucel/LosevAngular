# � LosevAngular - Şifre Yönetim Sistemi

Modern ve güvenli bir Angular tabanlı şifre yönetim uygulaması. Bu proje, kullanıcıların şifrelerini gruplar halinde organize edebileceği, güvenli bir şekilde saklayabileceği ve kolayca yönetebileceği kapsamlı bir web uygulamasıdır.

![Angular](https://img.shields.io/badge/Angular-19.2.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?style=for-the-badge&logo=bootstrap)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Docker](#-docker)
- [Proje Yapısı](#-proje-yapısı)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Katkıda Bulunma](#-katkıda-bulunma)

## ✨ Özellikler

### 🔐 Şifre Yönetimi
- **Grup Bazlı Organizasyon:** Şifrelerinizi kategorilere ayırın (Masaüstü, Web, Oyunlar vb.)
- **Güvenli Şifre Saklama:** Şifreler gizli formatta saklanır ve isteğe bağlı gösterilir
- **CRUD İşlemleri:** Şifre ekleme, düzenleme, silme ve görüntüleme
- **Arama ve Filtreleme:** Grup adına göre gerçek zamanlı arama

### 🎨 Kullanıcı Arayüzü
- **Responsive Tasarım:** Tüm cihazlarda mükemmel görünüm
- **Dark/Light Tema:** İki tema seçeneği ile kişiselleştirme
- **Çoklu Dil Desteği:** Türkçe/İngilizce dil paketi
- **Modern UI/UX:** Bootstrap 5 ile çağdaş tasarım
- **Interactive Elements:** Smooth animasyonlar ve hover efektleri

### 🛡️ Güvenlik ve Kimlik Doğrulama
- **JWT Token Bazlı Auth:** Güvenli oturum yönetimi
- **Route Guard:** Korumalı sayfalar
- **SweetAlert Integration:** Güvenli onay dialokları
- **Input Validation:** Form doğrulama ve hata kontrolü

### 🚀 Performans ve Optimizasyon
- **Lazy Loading:** Sayfa yükleme optimizasyonu
- **Standalone Components:** Modern Angular mimarisi
- **Pipe Filtering:** Performanslı arama sistemi
- **Local Storage:** Tema tercihlerinin kalıcı saklanması

## 🛠 Teknolojiler

### Frontend Framework
- **Angular 19.2.0** - Ana framework
- **TypeScript 5.7.2** - Tip güvenli geliştirme
- **RxJS** - Reactive programming
- **Angular Router** - SPA routing
- **Angular Forms** - Form yönetimi

### UI/UX Kütüphaneleri
- **Bootstrap 5.3** - CSS framework
- **FontAwesome** - İkon kütüphanesi
- **SweetAlert2** - Modern alert dialokları
- **Flexi Toast** - Bildirim sistemi
- **Flexi Button** - Gelişmiş buton komponenti

### Geliştirme Araçları
- **Angular CLI 19+** - Proje yönetimi
- **Angular DevKit** - Build tools
- **TypeScript Compiler** - TS transpilation
- **Docker** - Containerization
- **Nginx** - Production web server

## 🚀 Kurulum

### Gereksinimler
- **Node.js 18+** 
- **npm 8+**
- **Angular CLI 19+**

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

4. **Uygulamayı açın**
   
   Tarayıcınızda `http://localhost:4200/` adresini açın.

## 📱 Kullanım

### 🔑 Giriş
- Uygulama login sayfası ile başlar
- Test için herhangi bir kullanıcı adı ve şifre kullanabilirsiniz
- Başarılı girişten sonra ana sayfaya yönlendirilirsiniz

### 🏠 Ana Sayfa Özellikleri

#### Grup Yönetimi
- **Grup Ekle:** Yeni şifre grubu oluşturun
- **Grup Düzenle:** Grup adını değiştirin
- **Grup Sil:** Grubu ve içindeki tüm şifreleri silin
- **Grup Arama:** Gerçek zamanlı arama ile grupları filtreleyin

#### Şifre Yönetimi
- **Şifre Ekle:** Gruplara yeni şifreler ekleyin
- **Şifre Görüntüle:** Şifreleri göster/gizle butonuyla kontrol edin
- **Şifre Düzenle:** Mevcut şifre bilgilerini güncelleyin
- **Şifre Sil:** İstenmyeen şifreleri kaldırın

#### Tema Değiştirme
- Sağ üst köşedeki tema butonuyla Dark/Light tema arasında geçiş yapın
- Tema tercihiniz tarayıcıda kaydedilir

## 🐳 Docker

### Development Ortamı
```bash
# Development container'ı çalıştırın
docker build -f Dockerfile.dev -t losev-angular-dev .
docker run -p 4200:4200 losev-angular-dev
```

### Production Ortamı
```bash
# Production build
docker build -t losev-angular-prod .
docker run -p 80:80 losev-angular-prod
```

### Docker Compose
```bash
# Tüm servisleri çalıştırın
docker-compose up -d
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── components/          # UI Bileşenleri
│   │   ├── home/           # Ana sayfa
│   │   ├── login/          # Giriş sayfası
│   │   ├── footer/         # Footer bileşeni
│   │   └── not-found/      # 404 sayfası
│   ├── guards/             # Route korumaları
│   │   └── auth.guard.ts   # Kimlik doğrulama guard'ı
│   ├── interceptor/        # HTTP interceptor'ları
│   ├── models/             # TypeScript modelleri
│   ├── pipes/              # Custom pipe'lar
│   │   ├── search-group.pipe.ts
│   │   ├── search-user.pipe.ts
│   │   └── enum-value.pipe.ts
│   ├── services/           # Business logic servisleri
│   │   ├── sweet-alert.service.ts
│   │   ├── http.service.ts
│   │   ├── loading.service.ts
│   │   └── breadcrumb.service.ts
│   ├── directive/          # Custom directive'ler
│   └── constants/          # Uygulama sabitleri
├── public/                 # Statik dosyalar
│   ├── assets/            # Görseller ve CSS
│   └── favicon.ico        # Site ikonu
└── styles.css             # Global stiller
```

## 🎯 Özellik Detayları

### SweetAlert Entegrasyonu
- Modern ve kullanıcı dostu dialog'lar
- Türkçe dil desteği
- Çeşitli dialog türleri (input, confirm, delete, toast)
- Loading states ile kullanıcı geri bildirimi

### Responsive Tasarım
- Mobile-first yaklaşım
- Bootstrap 5 grid sistemi
- Flexible tablo tasarımı
- Touch-friendly interface

### Performans Optimizasyonları
- Lazy loading ile hızlı sayfa yüklemesi
- Pipe-based filtering
- Efficient change detection
- Minimal bundle size

## 🔧 Geliştirme

### Component Oluşturma
```bash
ng generate component component-name
```

### Service Oluşturma
```bash
ng generate service service-name
```

### Build
```bash
# Development build
ng build

# Production build
ng build --configuration production
```

### Test
```bash
# Unit testler
ng test

# E2E testler
ng e2e
```

## 📸 Ekran Görüntüleri

### Light Tema
- Temiz ve modern arayüz
- Kolay okunabilir tipografi
- Açık renkli tema

### Dark Tema
- Göz yormayan koyu tema
- Contrast optimizasyonu
- Gece kullanımı için ideal

### Mobile Görünüm
- Responsive tasarım
- Touch-optimized controls
- Compact layout

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

**Ali Can Yücel**
- GitHub: [@alicanyucel](https://github.com/alicanyucel)
- Email: alicanyucel@example.com

## 🙏 Teşekkürler

- Angular ekibine harika framework için
- Bootstrap ekibine responsive CSS framework için
- SweetAlert2 ekibine modern dialog sistemi için
- FontAwesome ekibine zengin ikon kütüphanesi için
