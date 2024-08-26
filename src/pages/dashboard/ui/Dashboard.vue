<script setup lang="ts">
import { useGetChats } from '@/entities/chat';

const platformToColor = {
  telegram: 'blue',
  discord: 'indigo'
};

const { data: chats, error } = useGetChats();
</script>

<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <VAlert v-if="error" title="Something went wrong" :text="error.message" type="error" />
      <template v-else>
        <VCol v-for="chat in chats" :key="chat.id" class="flex-grow-0">
          <VBtn :color="platformToColor[chat.platform]" :to="{ name: 'Chat', params: { chatId: chat.id } }">
            {{ chat.name }}
            <template #append>
              <VIcon :icon="`custom:${chat.platform}`" size="32" />
            </template>
          </VBtn>
        </VCol>
      </template>
    </VRow>
  </VContainer>
</template>
