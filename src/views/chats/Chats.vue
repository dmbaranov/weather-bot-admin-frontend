<script setup lang="ts">
import { useChatStore } from '@/stores'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)

chatStore.fetchAllChats()
</script>

<template>
  <pre>{{ chats }}</pre>
  <v-btn>Test</v-btn>
</template>
