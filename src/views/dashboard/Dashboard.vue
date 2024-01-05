<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { chatApi } from '@/api';
import { sharedChatQueryParams } from '@/api/chat';

const { data: chats } = useQuery({
  ...sharedChatQueryParams,
  queryFn: chatApi.getAll,
  select: (response) => response.data
});

const platformToColor = {
  telegram: 'blue',
  discord: 'indigo'
};
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
