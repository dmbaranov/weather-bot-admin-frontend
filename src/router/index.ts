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
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/chat/:chatId',
      name: 'Chat',
      component: Chat,
      children: [
        {
          path: 'users',
          name: 'ChatUsers',
          component: Users
        },
        {
          path: 'herojob',
          name: 'Herojob',
          component: Herojob
        },
        {
          path: 'accordion',
          name: 'Accordion',
          component: Accordion
        }
      ]
    }
  ]
});

export default router;
