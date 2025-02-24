import { createRouter, createWebHistory } from 'vue-router';
import { RouteName } from '@/shared/config';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.DASHBOARD,
      component: () => import('@/pages/dashboard').then((m) => m.Dashboard)
    },
    {
      path: '/chat/:chatId',
      name: RouteName.CHAT,
      component: () => import('@/pages/chat').then((m) => m.Chat),
      children: [
        {
          path: 'users',
          name: RouteName.CHAT_USERS,
          component: () => import('@/pages/chat').then((m) => m.Users)
        },
        {
          path: 'herojob',
          name: RouteName.HEROJOB,
          component: () => import('@/pages/chat').then((m) => m.Herojob)
        },
        {
          path: 'messages',
          name: RouteName.MESSAGES,
          component: () => import('@/pages/chat').then((m) => m.Messages)
        },
        {
          path: 'swearwords',
          name: RouteName.SWEARWORDS,
          component: () => import('@/pages/chat').then((m) => m.Swearwords)
        },
        {
          path: 'statistics',
          name: RouteName.STATISTICS,
          component: () => import('@/pages/chat').then((m) => m.Statistics)
        },
        {
          path: 'chat-config',
          name: RouteName.CHAT_CONFIG,
          component: () => import('@/pages/chat').then((m) => m.ChatConfig)
        }
      ]
    }
  ]
});

export default router;
