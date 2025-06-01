<template>
  <div class="quiz-result">
    <div class="result-card">
      <h2 class="text-center mb-4">Hasil Quiz</h2>
      
      <!-- Skor Utama -->
      <div class="score-circle mb-4">
        <div class="score-percentage">{{ result.percentage }}</div>
        <div class="score-label">Skor Anda</div>
      </div>

      <!-- Detail Skor -->
      <div class="score-details">
        <div class="row">
          <div class="col-6">
            <div class="score-item correct">
              <i class="bi bi-check-circle-fill"></i>
              <div class="score-info">
                <div class="score-value">{{ result.correctAnswers }}</div>
                <div class="score-label">Jawaban Benar</div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="score-item wrong">
              <i class="bi bi-x-circle-fill"></i>
              <div class="score-info">
                <div class="score-value">{{ result.wrongAnswers }}</div>
                <div class="score-label">Jawaban Salah</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Pertanyaan -->
      <div class="total-questions mt-4">
        Total Pertanyaan: {{ result.totalQuestions }}
      </div>

      <!-- Tombol Aksi -->
      <div class="action-buttons mt-4">
        <button @click="goToHome" class="btn btn-primary me-2">
          <i class="bi bi-house-door"></i> Kembali ke Home
        </button>
        <button @click="retryQuiz" class="btn btn-outline-primary">
          <i class="bi bi-arrow-repeat"></i> Coba Lagi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizResult',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    retryQuiz() {
      this.$router.push('/quiz');
    }
  }
}
</script>

<style scoped>
.quiz-result {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.result-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.score-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.score-percentage {
  font-size: 3rem;
  font-weight: bold;
}

.score-label {
  font-size: 1.2rem;
  opacity: 0.9;
}

.score-details {
  margin-top: 2rem;
}

.score-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.score-item.correct {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.score-item.wrong {
  background-color: #ffebee;
  color: #c62828;
}

.score-item i {
  font-size: 2rem;
  margin-right: 1rem;
}

.score-info {
  flex: 1;
}

.score-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.total-questions {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Animasi */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quiz-result {
  animation: fadeIn 0.5s ease-out;
}
</style>