<template>
  <div class="quiz-result-view">
    <div class="container">
      <QuizResult 
        v-if="quizResult" 
        :result="quizResult"
      />
      <div v-else class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Memuat hasil quiz...</p>
      </div>
    </div>
  </div>
</template>

<script>
import QuizResult from '@/components/QuizResult.vue'
import axios from 'axios'

export default {
  name: 'QuizResultView',
  components: {
    QuizResult
  },
  data() {
    return {
      quizResult: null
    }
  },
  async created() {
    try {
      // Ambil hasil quiz dari state atau localStorage
      const result = localStorage.getItem('lastQuizResult')
      if (result) {
        this.quizResult = JSON.parse(result)
      } else {
        // Jika tidak ada hasil di localStorage, ambil dari API
        const response = await axios.get('/api/quiz/results')
        if (response.data.results && response.data.results.length > 0) {
          // Ambil hasil terakhir
          this.quizResult = response.data.results[response.data.results.length - 1]
        }
      }
    } catch (error) {
      console.error('Error loading quiz result:', error)
      // Tampilkan pesan error ke user
      this.$toast.error('Gagal memuat hasil quiz')
    }
  }
}
</script>

<style scoped>
.quiz-result-view {
  min-height: 100vh;
  padding: 2rem 0;
  background-color: #f5f5f5;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading p {
  color: #666;
  font-size: 1.2rem;
}
</style> 