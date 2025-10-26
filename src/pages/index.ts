import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./main/Main.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('./student')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('./teacher')
    }
  ],
})

export default router
