import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'workbench',
    component: () => import('@/views/workbench/index.vue')
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: () => import('@/views/workbench/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
