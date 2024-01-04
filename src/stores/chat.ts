import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IChat } from '@/models/Chat';
import { chatApi } from '@/api';

export const useChatStore = defineStore('chat', () => {
  const chats = ref<IChat[]>([]);

  function fetchAllChats() {
    chatApi.getAll().then(({ data }) => (chats.value = data));
  }

  return { chats, fetchAllChats };
});
