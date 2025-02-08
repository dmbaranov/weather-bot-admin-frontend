<script setup lang="ts">
import { useGetChats } from '@/entities/chat';
import { getErrorMessage } from '@/shared/lib';

const platformToColor = {
  telegram: 'blue',
  discord: 'indigo'
};

const { data: chats, error } = useGetChats();
</script>

<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <VEmptyState v-if="error" icon="mdi-alert" title="Something went wrong" :text="getErrorMessage(error)" />
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
