import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Chat from '@/views/chat/Chat.vue';
import Users from '@/views/users/Users.vue';
import Herojob from '@/views/herojob/Herojob.vue';
import Accordion from '@/views/accordion/Accordion.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/chat/:chatId',
      name: 'chat',
      component: Chat,
      children: [
        {
          path: 'users',
          name: 'chatUsers',
          component: Users
        },
        {
          path: 'herojob',
          name: 'herojob',
          component: Herojob
        },
        {
          path: 'accordion',
          name: 'accordion',
          component: Accordion
        }
      ]
    }
  ]
});

export default router;
