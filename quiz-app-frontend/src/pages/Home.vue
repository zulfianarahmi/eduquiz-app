<template>
  <div class="home">
    <h1 class="home-title">
      <span class="home-icon">🎓</span>
      Welcome to Quiz App
    </h1>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="loading" class="loading">Loading subjects...</div>
    <div v-else-if="subjects.length === 0" class="no-subjects">
      No subjects available
    </div>
    <div v-else class="subjects-grid">
      <div
        v-for="subject in subjects"
        :key="subject.id"
        class="subject-card"
        @click="selectSubject(subject)"
      >
        <span class="subject-icon">{{ getSubjectIcon(subject.name) }}</span>
        <span class="subject-name">{{ subject.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api';

export default {
  name: 'Home',
  data() {
    return {
      subjects: [],
      error: '',
      loading: true
    };
  },
  async created() {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      this.$router.push('/login');
      return;
    }

    try {
      console.log('Fetching subjects...');
      const response = await apiService.getSubjects();
      console.log('Subjects response:', response);
      
      if (Array.isArray(response.data)) {
        this.subjects = response.data;
        console.log('Subjects loaded:', this.subjects);
      } else {
        console.error('Invalid subjects data:', response);
        this.error = 'Invalid subjects data received';
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
      if (error.message.includes('token')) {
        // If token is invalid, redirect to login
        localStorage.removeItem('token');
        this.$router.push('/login');
      } else {
        this.error = error.message || 'Failed to load subjects. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  },
  methods: {
    selectSubject(subject) {
      console.log('Selected subject:', subject);
      this.$router.push(`/material/${subject.id}`);
    },
    getSubjectIcon(name) {
      if (name.toLowerCase().includes('math')) return '📐'
      if (name.toLowerCase().includes('english')) return '🇬🇧'
      if (name.toLowerCase().includes('agama')) return '🕌'
      if (name.toLowerCase().includes('bahasa')) return '📚'
      if (name.toLowerCase().includes('ipa')) return '🔬'
      if (name.toLowerCase().includes('ips')) return '🌍'
      return '📖'
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 80vh;
}

.home-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #ff9800;
  margin-bottom: 36px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(255,152,0,0.08);
}

.home-icon {
  font-size: 2.2rem;
  margin-right: 10px;
  vertical-align: middle;
}

.error-message {
  color: red;
  margin: 20px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

.loading {
  text-align: center;
  color: #666;
  margin: 20px 0;
}

.no-subjects {
  text-align: center;
  color: #666;
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 28px;
  justify-items: center;
}

.subject-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 0 24px 0;
  min-width: 200px;
  min-height: 80px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subject-card:hover {
  background: #ffe082;
  box-shadow: 0 6px 24px rgba(255,152,0,0.13);
  transform: translateY(-4px) scale(1.03);
  color: #ff9800;
}

.subject-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.subject-name {
  font-size: 1.1em;
}
</style> 