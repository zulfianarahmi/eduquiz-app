<template>
  <div class="materi-section">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <h2 class="materi-title">Materi</h2>
      <div class="materi-list">
        <div v-for="(topic, idx) in material" :key="idx" class="materi-card">
          <div class="materi-card-title">
            📘 {{ topic.title }}
          </div>
          <div class="materi-card-content">
            {{ topic.content }}
          </div>
        </div>
      </div>
      <p class="quiz-info">Sudah paham materinya? Yuk, coba quiz di bawah ini!</p>
      <div class="quiz-card-invite">
        <h3>Quiz Waktunya!</h3>
        <p>Uji pemahamanmu setelah belajar materi ini.</p>
        <router-link :to="`/quiz/${subjectId}`" class="btn-quiz">📝 Mulai Quiz</router-link>
      </div>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const subjectId = route.params.subjectId
const loading = ref(true)
const error = ref('')
const material = ref([])

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/subjects/${subjectId}/material`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    material.value = res.data
  } catch (err) {
    error.value = 'Failed to load material.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.materi-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px 48px 16px;
}

.materi-title {
  color: #ff9800;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 32px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(255,152,0,0.08);
}

.materi-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.materi-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 28px 28px 22px 28px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.materi-card:hover {
  box-shadow: 0 6px 24px rgba(255,152,0,0.13);
  transform: translateY(-2px) scale(1.01);
}

.materi-card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ff9800;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.materi-card-content {
  color: #333;
  font-size: 1.08rem;
  line-height: 1.7;
}

.quiz-info {
  text-align: center;
  color: #888;
  font-size: 1.08rem;
  margin-top: 32px;
  margin-bottom: 0;
}

.quiz-card-invite {
  background: #e3f6fd;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(56,249,215,0.07);
  padding: 28px 24px;
  text-align: center;
  margin-top: 40px;
}

.quiz-card-invite h3 {
  color: #00bfae;
  font-weight: 700;
  margin-bottom: 8px;
}

.quiz-card-invite p {
  color: #555;
  margin-bottom: 18px;
}

.btn-quiz {
  display: block;
  margin: 36px auto 0 auto;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  padding: 16px 40px;
  box-shadow: 0 2px 12px rgba(67,233,123,0.13);
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  cursor: pointer;
  text-decoration: none;
}

.btn-quiz:hover {
  background: linear-gradient(90deg, #38f9d7 0%, #43e97b 100%);
  box-shadow: 0 6px 24px rgba(67,233,123,0.18);
  transform: translateY(-2px) scale(1.03);
}
</style> 