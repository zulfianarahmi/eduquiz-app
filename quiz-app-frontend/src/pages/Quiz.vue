<template>
  <div class="quiz-section-stepper">
    <div class="quiz-bg-bubbles">
      <div class="bubble bubble1"></div>
      <div class="bubble bubble2"></div>
      <div class="bubble bubble3"></div>
      <div class="bubble bubble4"></div>
      <div class="bubble bubble5"></div>
    </div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress" :style="{ width: ((currentIdx+1)/questions.length*100)+'%' }"></div>
    </div>
    <div class="quiz-progress-info">
      Soal {{ currentIdx + 1 }} dari {{ questions.length }}
    </div>
    <h2 class="quiz-title-stepper">🧠 Quiz</h2>
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <form v-if="!showScore" @submit.prevent="nextOrSubmit">
        <transition name="fade" mode="out-in">
          <div class="quiz-stepper-question" :key="currentIdx">
            <div class="quiz-stepper-qtext">Q{{ currentIdx + 1 }}. {{ questions[currentIdx].question }}</div>
            <div class="quiz-stepper-options">
              <label
                v-for="(option, oidx) in questions[currentIdx].options"
                :key="oidx"
                class="quiz-stepper-option"
                :class="{
                  selected: answers[currentIdx] === option,
                  'correct-answer': showAnswer && option === questions[currentIdx].correct,
                  'wrong-answer': showAnswer && answers[currentIdx] === option && option !== questions[currentIdx].correct
                }"
              >
                <input
                  type="radio"
                  :name="'q' + currentIdx"
                  :value="option"
                  v-model="answers[currentIdx]"
                  required
                  :disabled="showAnswer"
                />
                <span>{{ option }}</span>
              </label>
            </div>
            <transition name="fade-feedback">
              <div v-if="showAnswer" class="answer-feedback">
                <p>Jawaban yang benar: {{ questions[currentIdx].correct }}</p>
              </div>
            </transition>
          </div>
        </transition>
        <button type="submit" class="btn-quiz-stepper">
          {{ currentIdx === questions.length - 1 ? 'Selesai' : 'Next' }}
        </button>
      </form>
      <div v-else class="quiz-score-stepper">
        <h4>🎉 Quiz Selesai!</h4>
        <div class="score-summary">
          <p>Skor kamu: <b>{{ score }}</b> dari <b>{{ totalQuestions }}</b></p>
          <p>Persentase: <b>{{ percentage }}%</b></p>
          <p>Jawaban Benar: <b>{{ correctAnswers }}</b></p>
          <p>Jawaban Salah: <b>{{ wrongAnswers }}</b></p>
        </div>
        <router-link :to="`/material/${subjectId}`" class="btn btn-secondary mt-3">Kembali ke Materi</router-link>
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
const questions = ref([])
const answers = ref([])
const showScore = ref(false)
const loading = ref(true)
const error = ref('')
const currentIdx = ref(0)
const showAnswer = ref(false)
const score = ref(0)
const totalQuestions = ref(0)
const percentage = ref(0)
const correctAnswers = ref(0)
const wrongAnswers = ref(0)

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/subjects/${subjectId}/quiz`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    questions.value = res.data
    answers.value = new Array(res.data.length).fill('')
  } catch (err) {
    error.value = 'Failed to load quiz.'
  } finally {
    loading.value = false
  }
})

function hitungSkor() {
  let benar = 0
  questions.value.forEach((q, idx) => {
    if (answers.value[idx] === q.correct) benar++
  })
  score.value = benar
  totalQuestions.value = questions.value.length
  percentage.value = ((benar / totalQuestions.value) * 100).toFixed(2)
  correctAnswers.value = benar
  wrongAnswers.value = totalQuestions.value - benar
}

function nextOrSubmit() {
  if (!showAnswer.value) {
    showAnswer.value = true
  } else if (currentIdx.value < questions.value.length - 1) {
    currentIdx.value++
    showAnswer.value = false
  } else {
    hitungSkor()
    showScore.value = true
  }
}
</script>

<style>
.quiz-section-stepper {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 16px 48px 16px;
  position: relative;
}
.quiz-bg-bubbles {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.bubble {
  position: absolute;
  bottom: -100px;
  background: rgba(67,233,123,0.18);
  border-radius: 50%;
  opacity: 0.7;
  animation: bubbleUp 10s linear infinite;
}
.bubble1 { left: 10%; width: 40px; height: 40px; animation-delay: 0s;}
.bubble2 { left: 30%; width: 25px; height: 25px; animation-delay: 2s;}
.bubble3 { left: 50%; width: 60px; height: 60px; animation-delay: 4s;}
.bubble4 { left: 70%; width: 30px; height: 30px; animation-delay: 1s;}
.bubble5 { left: 85%; width: 20px; height: 20px; animation-delay: 3s;}
@keyframes bubbleUp {
  0% { bottom: -100px; opacity: 0.7;}
  80% { opacity: 0.5;}
  100% { bottom: 100%; opacity: 0;}
}
.quiz-progress-bar {
  width: 100%;
  height: 10px;
  background: #f0f0f0;
  border-radius: 6px;
  margin-bottom: 24px;
  overflow: hidden;
}
.quiz-progress {
  height: 100%;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  border-radius: 6px;
  transition: width 0.3s;
}
.quiz-title-stepper {
  color: #00bfae;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  text-align: center;
}
.quiz-stepper-question {
  margin-bottom: 18px;
}
.quiz-stepper-qtext {
  font-size: 1.13rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
}
.quiz-stepper-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quiz-stepper-option {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 18px;
  border-radius: 8px;
  background: #f7f7f7;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
  border: 2px solid transparent;
  user-select: none;
}
.quiz-stepper-option.selected,
.quiz-stepper-option:hover {
  background: #e3f6fd;
  color: #00bfae;
  border: 2px solid #00bfae;
}
.btn-quiz-stepper {
  display: block;
  margin: 36px auto 0 auto;
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  padding: 12px 40px;
  box-shadow: 0 2px 12px rgba(67,233,123,0.13);
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  cursor: pointer;
  text-decoration: none;
}
.btn-quiz-stepper:hover {
  background: linear-gradient(90deg, #38f9d7 0%, #43e97b 100%);
  box-shadow: 0 6px 24px rgba(67,233,123,0.18);
  transform: translateY(-2px) scale(1.03);
}
.quiz-score-stepper {
  background: #e3f6fd;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(56,249,215,0.07);
  padding: 32px 24px;
  text-align: center;
  margin-top: 40px;
  color: #00bfae;
  font-size: 1.3rem;
  font-weight: 700;
}
.quiz-stepper-option.correct-answer {
  background: #e3f6fd;
  color: #00bfae;
  border: 2px solid #00bfae;
}
.quiz-stepper-option.wrong-answer {
  background: #ffe3e3;
  color: #ff4d4d;
  border: 2px solid #ff4d4d;
}
.answer-feedback {
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #00bfae;
  font-weight: 600;
}
</style> 