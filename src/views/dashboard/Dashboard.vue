<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores'
import ChatSelector from './ChatSelector.vue'

const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)

chatStore.fetchAllChats()
</script>

<template>
  <div>Dashboard goes here</div>
  <ChatSelector v-for="chat in chats" :key="chat.id" :chat="chat" />
</template>
