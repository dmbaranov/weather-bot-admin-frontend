<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()
const { chats } = storeToRefs(chatStore)

chatStore.fetchAllChats()

const platformToColor = {
  telegram: 'blue',
  discord: 'indigo'
}
</script>

<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <VCol v-for="chat in chats" :key="chat.id" class="flex-grow-0">
        <VBtn :color="platformToColor[chat.platform]" :to="{ name: 'chat', params: { chatId: chat.id } }">{{ chat.name }}</VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>
