import { createRouter, createWebHistory } from 'vue-router';
import { Dashboard } from '@/pages/dashboard';
import { RouteName } from '@/shared';
import { Accordion, Chat, Herojob, Users, Messages, Swearwords } from '@/pages/chat';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.DASHBOARD,
      component: Dashboard
    },
    {
      path: '/chat/:chatId',
      name: RouteName.CHAT,
      component: Chat,
      children: [
        {
          path: 'users',
          name: RouteName.CHAT_USERS,
          component: Users
        },
        {
          path: 'herojob',
          name: RouteName.HEROJOB,
          component: Herojob
        },
        {
          path: 'accordion',
          name: RouteName.ACCORDION,
          component: Accordion
        },
        {
          path: 'messages',
          name: RouteName.MESSAGES,
          component: Messages
        },
        {
          path: 'swearwords',
          name: RouteName.SWEARWORDS,
          component: Swearwords
        }
      ]
    }
  ]
});

export default router;
