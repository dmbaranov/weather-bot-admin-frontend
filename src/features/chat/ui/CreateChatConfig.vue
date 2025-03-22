<script lang="ts" setup>
import { useGetChatId } from '@/shared/lib';
import { useCreateChatConfig } from '@/entities/chat_config/lib/chatConfigQueries.ts';
import { ref } from 'vue';

const chatId = useGetChatId();
const { mutateAsync: createChatConfig, error: createChatConfigError } = useCreateChatConfig(chatId);
const snackbarShown = ref(false);

function create() {
  createChatConfig().finally(() => {
    snackbarShown.value = true;
  });
}
</script>

<template>
  <VBtn color="blue" @click="create">Create</VBtn>
  <VSnackbar v-model="snackbarShown" :timeout="2000">
    <div>{{ createChatConfigError ? `Chat config creation failed: ${createChatConfigError.message}` : 'Chat config created!' }}</div>
  </VSnackbar>
</template>
