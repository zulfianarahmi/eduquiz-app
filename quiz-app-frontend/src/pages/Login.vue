<template>
  <div class="login-bg">
    <div class="login-center">
      <div class="login-card">
        <div class="login-icon">🎓</div>
        <h2 class="login-title mb-2">Welcome to EduQuiz!</h2>
        <p class="login-subtitle mb-4">Sign in to start your learning journey</p>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn-login w-100" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </form>
        <div class="login-quote mt-4">"Education is the most powerful weapon which you can use to change the world."</div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = '';
      
      try {
        const response = await apiService.login(this.email, this.password);
        
        localStorage.setItem('token', response.data.token);
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        this.error = error.response?.data?.message || 'Login failed';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #ffe082 0%, #ffb74d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}
.login-center {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 40px 32px 32px 32px;
  max-width: 370px;
  width: 100%;
  text-align: center;
}
.login-icon {
  font-size: 3rem;
  margin-bottom: 8px;
}
.login-title {
  font-weight: 700;
  color: #ff9800;
  letter-spacing: 1px;
}
.login-subtitle {
  color: #757575;
  font-size: 1rem;
}
.btn-login {
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(67,233,123,0.10);
  cursor: pointer;
}
.btn-login:hover:not(:disabled) {
  box-shadow: 0 6px 16px rgba(67,233,123,0.18);
  transform: translateY(-2px) scale(1.03);
}
.login-quote {
  font-size: 0.95rem;
  color: #888;
  font-style: italic;
  margin-top: 18px;
}
</style> 