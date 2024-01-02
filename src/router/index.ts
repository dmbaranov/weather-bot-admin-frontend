import { createRouter, createWebHistory } from 'vue-router'
import Chats from '@/views/chats/Chats.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chats',
      component: Chats
    }
  ]
})

export default router
