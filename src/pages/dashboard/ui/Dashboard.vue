<script setup lang="ts">
import { useGetChats } from '@/entities/chat';
import { GeneralError } from '@/widgets/Errors';

const platformToColor = {
  telegram: 'blue',
  discord: 'indigo'
};

const { data: chats, error } = useGetChats();
</script>

<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <GeneralError :error="error" />
      <VCol v-for="chat in chats" :key="chat.id" class="flex-grow-0">
        <VBtn :color="platformToColor[chat.platform]" :to="{ name: 'Chat', params: { chatId: chat.id } }">
          {{ chat.name }}
          <template #append>
            <VIcon :icon="`custom:${chat.platform}`" size="32" />
          </template>
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>
