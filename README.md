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
- [FontAwesome İkon Sistemi](#-fontawesome-ikon-sistemi)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Katkıda Bulunma](#-katkıda-bulunma)

## ✨ Özellikler

### 🔐 Şifre Yönetimi
- **Grup Bazlı Organizasyon:** Şifrelerinizi kategorilere ayırın (Masaüstü, Web, Oyunlar vb.)
- **Güvenli Şifre Saklama:** Şifreler gizli formatta saklanır ve isteğe bağlı gösterilir
- **CRUD İşlemleri:** Şifre ekleme, düzenleme, silme ve görüntüleme
- **Arama ve Filtreleme:** Grup adına göre gerçek zamanlı arama
- **🔒 Şifre Gücü Kontrolü:** Gerçek zamanlı şifre gücü analizi ve öneriler
- **🎲 Güçlü Şifre Üreteci:** Otomatik güvenli şifre oluşturma (12+ karakter)
- **📊 CSV İçe/Dışa Aktarma:** Şifrelerinizi CSV formatında yedekleme ve geri yükleme

### 🎨 Kullanıcı Arayüzü
- **Responsive Tasarım:** Tüm cihazlarda mükemmel görünüm
- **Dark/Light Tema:** İki tema seçeneği ile kişiselleştirme
- **Çoklu Dil Desteği:** Türkçe/İngilizce dil paketi
- **Modern UI/UX:** Bootstrap 5 ile çağdaş tasarım
- **FontAwesome İkonları:** 60+ profesyonel ikon kullanımı
  - 🔍 Arama ikonu (search)
  - 🌐 Dil seçici ikonu (language)
  - 🌙☀️ Tema değiştirme ikonları (moon/sun)
  - 🍪 Çerez yönetimi ikonu (cookie-bite)
  - ➕ Ekleme ikonları (plus)
  - ✏️ Düzenleme ikonları (edit)
  - 🗑️ Silme ikonları (trash)
  - 👁️ Göster/Gizle ikonları (eye/eye-slash)
  - 📥📤 CSV İçe/Dışa Aktarma ikonları (download/upload)
  - 🛡️ Güvenlik ikonları (shield-alt)
  - 💡 Öneri ikonu (lightbulb)
  - 🎲 Şifre üretici ikonu (magic)
  - 🏠 Ana sayfa ikonu (home)
- **Breadcrumb Navigasyon:** Sayfa konumu ve geçmiş takibi
- **Interactive Elements:** Smooth animasyonlar ve hover efektleri

### 🛡️ Güvenlik ve Kimlik Doğrulama
- **JWT Token Bazlı Auth:** Güvenli oturum yönetimi
- **Route Guard:** Korumalı sayfalar
- **SweetAlert Integration:** Güvenli onay dialokları
- **Input Validation:** Form doğrulama ve hata kontrolü
- **🔐 Şifre Gücü Analizi:** Gerçek zamanlı güvenlik skoru hesaplama
- **📋 Güvenlik Önerileri:** Zayıf şifreler için iyileştirme önerileri
- **🎯 Güvenlik Kriterleri:** Büyük/küçük harf, sayı, özel karakter kontrolü

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
- **Bootstrap 5.3** - CSS framework ve responsive tasarım
- **FontAwesome 6.x** - Kapsamlı ikon kütüphanesi (600+ ikon)
  - Düğme ikonları (edit, delete, add, show/hide)
  - UI ikonları (search, language, theme, cookie)
  - Navigasyon ikonları (dropdown, toggle)
  - Güvenlik ikonları (shield-alt, lock, magic)
  - Import/Export ikonları (download, upload)
- **SweetAlert2** - Modern alert dialokları
- **Flexi Toast** - Bildirim sistemi
- **Flexi Button** - Gelişmiş buton komponenti
- **CSV Parser** - Dosya içe/dışa aktarma sistemi
- **Password Strength Meter** - Şifre gücü analiz sistemi

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
- **Şifre Sil:** İstenmeyen şifreleri kaldırın
- **🔒 Şifre Gücü Kontrolü:** Yeni şifre girerken gerçek zamanlı güvenlik analizi
- **🎲 Güçlü Şifre Üretimi:** "Şifre Üret" butonu ile 12+ karakter güvenli şifre oluşturma
- **📊 Güvenlik Önerileri:** Zayıf şifreler için otomatik iyileştirme önerileri

#### 📁 CSV İçe/Dışa Aktarma
- **📤 CSV Dışa Aktarma:** Tüm şifrelerinizi CSV formatında bilgisayarınıza kaydedin
- **📥 CSV İçe Aktarma:** Dışa aktardığınız veya başka kaynaklardan aldığınız CSV dosyalarını sisteme yükleyin
- **🔄 Otomatik Birleştirme:** İçe aktarılan veriler mevcut gruplarla akıllıca birleştirilir
- **✅ Format Doğrulama:** CSV dosyalarının geçerliliği otomatik kontrol edilir
- **📋 CSV Format:** Group, Name, URL, Password sütunları ile standart format

#### Tema Değiştirme
- Sağ üst köşedeki tema butonuyla Dark/Light tema arasında geçiş yapın
- Tema tercihiniz tarayıcıda kaydedilir

#### 🍪 Çerez Yönetimi
- **Çerez Görüntüleme:** Tarayıcınızdaki çerezleri listeleyin
- **Çerez Temizleme:** Tüm çerezleri güvenli bir şekilde silin
- **Çerez Bilgisi:** Detaylı çerez içerik görüntüleme

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
│   │   ├── breadcrumb/     # Breadcrumb navigasyon
│   │   ├── footer/         # Footer bileşeni
│   │   ├── password-strength/ # Şifre gücü kontrolü bileşeni
│   │   └── not-found/      # 404 sayfası
│   ├── guards/             # Route korumaları
│   │   └── auth.guard.ts   # Kimlik doğrulama guard'ı
│   ├── interceptor/        # HTTP interceptor'ları
│   ├── models/             # TypeScript modelleri
│   ├── pipes/              # Custom pipe'lar
│   │   ├── search-group.pipe.ts     # Grup arama filtresi
│   │   ├── search-user.pipe.ts      # Kullanıcı arama filtresi
│   │   ├── translate.pipe.ts        # Çoklu dil çeviri sistemi
│   │   └── enum-value.pipe.ts       # Enum değer dönüştürücü
│   ├── services/           # Business logic servisleri
│   │   ├── sweet-alert.service.ts   # Dialog yönetimi
│   │   ├── http.service.ts          # HTTP işlemleri
│   │   ├── loading.service.ts       # Yükleme durumu
│   │   ├── breadcrumb.service.ts    # Breadcrumb navigasyon
│   │   ├── i18n.service.ts          # Çoklu dil sistemi
│   │   ├── cookie.service.ts        # Çerez yönetimi
│   │   ├── csv.service.ts           # CSV işlemleri
│   │   ├── password-strength.service.ts # Şifre gücü analizi
│   │   └── error-handler.service.ts # Hata yönetimi
│   ├── directive/          # Custom directive'ler
│   └── constants/          # Uygulama sabitleri
├── public/                 # Statik dosyalar
│   ├── assets/            # Görseller ve CSS
│   └── favicon.ico        # Site ikonu
└── styles.css             # Global stiller
```

## 🎯 Özellik Detayları

### 🔒 Şifre Gücü Kontrolü Sistemi
- **Gerçek Zamanlı Analiz:** Şifre yazarken anlık güvenlik skoru hesaplama
- **Görsel Geri Bildirim:** Renkli progress bar ile güç seviyesi gösterimi
- **Detaylı Öneriler:** Zayıf şifreler için spesifik iyileştirme önerileri
- **Güvenlik Kriterleri:**
  - Minimum 8 karakter uzunluğu
  - Büyük ve küçük harf kombinasyonu
  - Sayısal karakter kontrolü
  - Özel karakter gerekliliği
  - Yaygın şifre kontrolü
- **Otomatik Şifre Üreteci:** 12+ karakter güvenli şifre oluşturma
- **Skor Sistemi:** 0-100 arası güvenlik puanlaması
- **Renk Kodları:**
  - 🔴 Zayıf (0-25): Kırmızı
  - 🟡 Orta (26-50): Sarı
  - 🟠 İyi (51-75): Turuncu
  - 🟢 Güçlü (76-100): Yeşil

### 📊 CSV İçe/Dışa Aktarma Sistemi
- **Güvenli Dışa Aktarma:** 
  - UTF-8 encoding ile Türkçe karakter desteği
  - BOM (Byte Order Mark) ile Excel uyumluluğu
  - Özel karakter escape sistemi
  - Tarih damgalı dosya adlandırma
- **Akıllı İçe Aktarma:**
  - CSV format doğrulaması
  - Duplicate kontrol sistemi
  - Otomatik grup birleştirme
  - Hata raporlama sistemi
- **CSV Format Standardı:**
  ```csv
  Group,Name,URL,Password
  "Web","Gmail","https://gmail.com","SecurePass123!"
  "Games","Steam","https://steam.com","GamePass456@"
  ```
- **Dosya Güvenliği:**
  - Client-side işleme (veriler sunucuya gönderilmez)
  - Blob API ile güvenli indirme
  - FileReader API ile güvenli okuma

### SweetAlert Entegrasyonu
- Modern ve kullanıcı dostu dialog'lar
- Türkçe dil desteği
- Çeşitli dialog türleri (input, confirm, delete, toast)
- Loading states ile kullanıcı geri bildirimi
- FontAwesome ikonları ile gelişmiş buton tasarımı

### 🍪 Çerez Yönetim Sistemi
- **Çerez Görüntüleme:** Tarayıcıdaki tüm çerezleri listeleme
- **Detaylı Bilgi:** Çerez adı, değeri ve son kullanma tarihi
- **Güvenli Temizleme:** Tüm çerezleri güvenli silme
- **Uygulama Çerezleri:**
  - `user_theme`: Tema tercihi (dark/light)
  - `user_language`: Dil tercihi (tr/en)
  - `user_settings`: Uygulama ayarları

### 🌐 Çoklu Dil Sistemi (i18n)
- **Desteklenen Diller:** Türkçe 🇹🇷, İngilizce 🇺🇸
- **Kapsamlı Çeviri:** 100+ çeviri anahtarı
- **Dinamik Dil Değiştirme:** Sayfa yenileme gerektirmeden
- **Persistent Storage:** Seçilen dil tercihi kalıcı saklama
- **Çeviri Kategorileri:**
  - UI Elemanları (butonlar, etiketler)
  - Dialog Mesajları (uyarılar, onaylar)
  - Hata Mesajları (doğrulama, sistem)
  - Bilgi Mesajları (başarı, bildirim)

### Breadcrumb Navigasyon
- Otomatik sayfa konumu takibi
- Çoklu dil desteği (TR/EN)
- FontAwesome ikonları ile görsel zenginlik
- Dark/Light tema desteği
- Responsive tasarım
- Router entegrasyonu

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

## 🎨 FontAwesome İkon Sistemi

Bu projede FontAwesome 6.x kullanılarak profesyonel bir ikon sistemi kurulmuştur.

### 🔧 Kurulum
FontAwesome CDN üzerinden index.html'e entegre edilmiştir:
```html
<script src="https://kit.fontawesome.com/a3604e2b80.js" crossorigin="anonymous"></script>
```

### 📋 Kullanılan İkonlar

#### 🔍 Arama ve Navigasyon
- `fa fa-search` - Arama kutusu
- `fa fa-language` - Dil seçici dropdown
- `fa fa-cookie-bite` - Çerez yönetimi

#### 🌙 Tema İkonları
- `fa fa-moon` - Karanlık tema
- `fa fa-sun` - Aydınlık tema

#### ⚡ Aksiyon İkonları
- `fa fa-plus` - Yeni grup/şifre ekleme
- `fa fa-edit` - Düzenleme işlemleri
- `fa fa-trash` - Silme işlemleri
- `fa fa-eye` / `fa fa-eye-slash` - Şifre göster/gizle
- `fa fa-download` - CSV dışa aktarma
- `fa fa-upload` - CSV içe aktarma

#### 🔒 Güvenlik İkonları
- `fa fa-shield-alt` - Şifre gücü göstergesi
- `fa fa-magic` - Şifre üretici
- `fa fa-lightbulb` - Güvenlik önerileri
- `fa fa-lock` - Güvenlik durumu

#### ℹ️ Bilgi İkonları
- `fa fa-info-circle` - Çerez bilgisi
- `fa fa-times` - Kapatma işlemleri

### 🎯 İkon Kullanım Örnekleri

```html
<!-- Dil seçici butonu -->
<button class="btn btn-outline-secondary dropdown-toggle">
  <i class="fa fa-language me-2"></i>{{ getCurrentLanguage().name }}
</button>

<!-- Tema değiştirme butonu -->
<button (click)="toggleTheme()">
  <i [class]="isDarkTheme ? 'fa fa-sun me-1' : 'fa fa-moon me-1'"></i>
  {{ isDarkTheme ? 'Light' : 'Dark' }}
</button>

<!-- Arama input grubu -->
<div class="input-group">
  <span class="input-group-text">
    <i class="fa fa-search"></i>
  </span>
  <input type="text" class="form-control" placeholder="Ara...">
</div>
```

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
