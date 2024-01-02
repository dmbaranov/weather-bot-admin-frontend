import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Chat } from '@/models/Chat'
import { api } from '@/api'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])

  async function fetchAllChats() {
    await api.get<Chat[]>('/chats').then(({ data }) => (chats.value = data))
  }

  return { chats, fetchAllChats }
})
