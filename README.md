# Wesoły Zakątek - Park Trampolin i Małpi Gaj

## Opis
Nowoczesna, responsywna strona internetowa dla największego parku trampolin w Warszawie. Strona zawiera futurystyczny design, kompleksowe informacje o usługach, interaktywną galerię, system recenzji oraz AI chatbota.

## ✨ Funkcje

### 🎨 Design & UX
- **Futurystyczny design** z animacjami CSS i efektami szklanymi
- **Pełna responsywność** - optymalne wyświetlanie na wszystkich urządzeniach
- **Dark mode ready** - przygotowana struktura dla ciemnego motywu
- **Progressive Web App (PWA)** - instalacja jako aplikacja mobilna
- **Page loader** z animacją ładowania

### 🧭 Nawigacja
- **Sticky header** z efektem rozmycia tła
- **Mobile hamburger menu** z płynnymi animacjami
- **Smooth scrolling** do sekcji
- **Active section highlighting** w menu

### 🤖 Interaktywność
- **AI Chatbot** - inteligentny asystent odpowiadający na pytania
- **Google Maps integration** - interaktywna mapa lokalizacji
- **Galeria zdjęć** z lightbox'em i uploadem
- **System recenzji** - Google Reviews i Facebook Reviews
- **Formularz kontaktowy** z walidacją

### 📱 Dostępność (Accessibility)
- **ARIA labels** i role dla czytników ekranowych
- **Keyboard navigation** - pełna obsługa klawiatury
- **Semantic HTML** - poprawne znaczniki semantyczne
- **Focus management** - widoczne wskaźniki fokusu

### 🔍 SEO & Performance
- **Structured Data (JSON-LD)** - dane strukturalne dla wyszukiwarek
- **Open Graph & Twitter Cards** - optymalizacja udostępniania
- **Lazy loading** obrazów dla lepszej wydajności
- **Service Worker** - cache'owanie i tryb offline
- **Sitemap.xml** i **robots.txt** dla wyszukiwarek

### 📊 Analytics & Monitoring
- **Google Analytics 4** integration
- **Error tracking** przygotowany
- **Performance monitoring** struktura

## 🛠 Technologie
- **HTML5** - semantyczna struktura
- **CSS3** - zaawansowane animacje, Grid, Flexbox
- **JavaScript ES6+** - klasy, async/await, moduły
- **PWA** - Service Worker, Web App Manifest
- **Google Maps API** - integracja map
- **Font Awesome** - ikony
- **Google Fonts** - typografia

## 🚀 Instalacja i uruchomienie

### Wymagania
- Serwer WWW (Apache/Nginx) lub localhost
- Przeglądarka internetowa z obsługą ES6+

### Uruchomienie
1. Pobierz pliki projektu
2. Umieść w katalogu serwera WWW
3. Otwórz `index.html` w przeglądarce
4. Dla pełnej funkcjonalności:
   - Skonfiguruj Google Maps API key
   - Skonfiguruj Google Analytics ID

### Konfiguracja PWA
1. Zaktualizuj `manifest.json` z własnymi ikonami
2. Dostosuj Service Worker w `sw.js`
3. Przetestuj instalację PWA w Chrome DevTools

## 📁 Struktura projektu
```
wesoly-zakatek/
├── index.html          # Główna strona
├── style.css           # Style CSS
├── script.js           # JavaScript
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── sitemap.xml        # Mapa strony
├── robots.txt         # Instrukcje dla botów
├── logopz.png         # Logo
├── parkr.png          # Grafika hero
└── README.md          # Dokumentacja
```

## 🔧 Konfiguracja

### Google Maps
1. Uzyskaj API key z Google Cloud Console
2. Włącz Maps JavaScript API
3. Dodaj klucz do `script.js` w klasie GoogleMapsManager

### Google Analytics
1. Utwórz konto Google Analytics 4
2. Zastąp `GA_MEASUREMENT_ID` prawdziwym ID
3. Zaktualizuj w `index.html`

### Domena i hosting
- Dla produkcji: skonfiguruj HTTPS
- Zaktualizuj wszystkie URL w structured data
- Przetestuj PWA na urządzeniach mobilnych

## 🎯 Roadmap

### Wersja 2.0
- [ ] System rezerwacji online
- [ ] Panel administratora
- [ ] Wielojęzyczność (i18n)
- [ ] Dark mode toggle
- [ ] Push notifications

### Wersja 1.5
- [ ] Integracja z systemem płatności
- [ ] Newsletter signup
- [ ] Live chat zamiast AI chatbota
- [ ] Zaawansowana analityka

## 📞 Kontakt
- **Email:** kontakt@wesoly-zakatek.pl
- **Telefon:** +48 123 456 789
- **Adres:** ul. Przykład 123, Warszawa

## 📄 Licencja
Wszystkie prawa zastrzeżone © 2024 Wesoły Zakątek

## 🤝 Współpraca
Projekt stworzony z ❤️ dla dzieci i rodziców Warszawy.
<parameter name="filePath">c:\serwer\htdocs\oferteo1\README.md