import axios from 'axios';

// Make sure this URL matches your backend server
const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
const apiService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
  
  getSubjects: () => {
    return api.get('/subjects');
  },
  
  getMateri: (pelajaran) => {
    return api.get(`/materi/${pelajaran}`);
  },
  
  getSoal: (submateri) => {
    return api.get(`/soal/${submateri}`);
  }
};

export { api };
export default apiService; 