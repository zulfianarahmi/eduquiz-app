import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./pages/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/material/:subjectId',
    name: 'Material',
    component: () => import('./pages/Material.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/quiz/:subjectId',
    name: 'Quiz',
    component: () => import('./pages/Quiz.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for auth
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router 