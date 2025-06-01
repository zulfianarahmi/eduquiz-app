const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Protected quiz route
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the quiz!', user: req.user });
});

// Submit jawaban dan hitung skor
router.post('/submit', authMiddleware, (req, res) => {
  try {
    const { answers, quizId } = req.body;
    const userId = req.user.email;

    // Baca file soal untuk mendapatkan jawaban yang benar
    const soalPath = path.join(__dirname, '../data/soal.json');
    const soalData = JSON.parse(fs.readFileSync(soalPath, 'utf8'));
    
    // Cari quiz yang sesuai
    const questions = soalData[quizId];
    if (!questions) {
      return res.status(404).json({ message: 'Quiz tidak ditemukan' });
    }

    // Hitung skor
    let score = 0;
    let totalQuestions = questions.length;
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        score++;
      }
    });

    // Hitung persentase
    const percentage = (score / totalQuestions) * 100;

    // Simpan hasil quiz
    const result = {
      userId,
      quizId,
      score,
      totalQuestions,
      percentage,
      timestamp: new Date().toISOString()
    };

    // Baca file hasil yang ada
    const resultsPath = path.join(__dirname, '../data/results.json');
    let results = [];
    try {
      results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    } catch (error) {
      // File belum ada, buat baru
    }

    // Tambahkan hasil baru
    results.push(result);

    // Simpan kembali ke file
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    // Kirim response
    res.json({
      message: 'Quiz selesai!',
      result: {
        score,
        totalQuestions,
        percentage: percentage.toFixed(2) + '%',
        correctAnswers: score,
        wrongAnswers: totalQuestions - score
      }
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memproses quiz' });
  }
});

// Get hasil quiz user
router.get('/results', authMiddleware, (req, res) => {
  try {
    const userId = req.user.email;
    const resultsPath = path.join(__dirname, '../data/results.json');
    
    let results = [];
    try {
      results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    } catch (error) {
      // File belum ada
      return res.json({ results: [] });
    }

    // Filter hasil berdasarkan userId
    const userResults = results.filter(r => r.userId === userId);
    
    res.json({ results: userResults });
  } catch (error) {
    console.error('Error getting results:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil hasil quiz' });
  }
});

module.exports = router;
