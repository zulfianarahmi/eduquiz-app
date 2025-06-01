# Quiz App Backend

Backend untuk aplikasi Quiz menggunakan Express.js

## Teknologi yang Digunakan
- Node.js
- Express.js
- JWT untuk autentikasi
- CORS untuk keamanan

## Struktur Folder
```
quiz-app-backend/
├── data/           # File JSON untuk menyimpan data
├── middleware/     # Middleware (auth, dll)
├── models/         # Model data
├── routes/         # Route handlers
├── scripts/        # Script utilitas
├── app.js         # File utama aplikasi
├── config.js      # Konfigurasi aplikasi
└── package.json   # Dependencies
```

## Endpoint API

### Autentikasi
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Mata Pelajaran
- `GET /api/subjects` - Mendapatkan daftar mata pelajaran

### Materi
- `GET /api/materi/:pelajaran` - Mendapatkan materi berdasarkan mata pelajaran

### Soal
- `GET /api/soal/:submateri` - Mendapatkan soal berdasarkan submateri

### Quiz
- `GET /api/quiz` - Mendapatkan daftar quiz
- `POST /api/quiz/submit` - Submit jawaban quiz dan dapatkan skor
  - Request body: `{ answers: [], quizId: string }`
  - Response: `{ score, totalQuestions, percentage, correctAnswers, wrongAnswers }`
- `GET /api/quiz/results` - Mendapatkan riwayat hasil quiz user

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan server:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## Environment Variables
Buat file `.env` dengan variabel berikut:
```
PORT=3000
JWT_SECRET=your-secret-key
```

## Testing
Untuk testing API, gunakan Postman atau tools serupa dengan endpoint yang tersedia di atas.
