# Quiz App Frontend

Frontend untuk aplikasi Quiz menggunakan Vue.js

## Teknologi yang Digunakan
- Vue.js 3
- Vue Router
- Bootstrap
- Axios untuk HTTP requests
- Local Storage untuk manajemen token

## Struktur Folder
```
quiz-app-frontend/
├── public/         # File statis
├── src/           # Source code
│   ├── assets/    # Gambar, CSS, dll
│   ├── components/# Komponen Vue
│   ├── views/     # Halaman
│   ├── router/    # Konfigurasi Vue Router
│   ├── store/     # State management
│   └── App.vue    # Root component
├── index.html     # Entry point HTML
└── package.json   # Dependencies
```

## Fitur
- Login/Logout
- Daftar Mata Pelajaran
- Materi Pembelajaran
- Quiz Interaktif
- Hasil Quiz
- Proteksi Halaman (Auth Guard)

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Build untuk Production
```bash
npm run build
```

## Environment Variables
Buat file `.env` dengan variabel berikut:
```
VITE_API_URL=http://localhost:3000/api
```

## Integrasi dengan Backend
Frontend ini terintegrasi dengan backend Quiz App yang menyediakan API untuk:
- Autentikasi
- Data mata pelajaran
- Materi pembelajaran
- Soal quiz
- Submit jawaban

## Testing
Untuk testing UI, gunakan browser developer tools dan Vue DevTools.
