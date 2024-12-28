<script setup lang="ts">
import { ref } from 'vue';
import { useSendMessageToChat } from '@/entities/chat';
import { useGetChatPlatform } from '../lib/useGetChatPlatform.ts';
import { useGetChatId } from '../lib/useGetChatId.ts';

const chatId = useGetChatId();
const { platform } = useGetChatPlatform(chatId);
const { mutateAsync, error } = useSendMessageToChat(platform, chatId);
const messageText = ref('');
const snackbarShown = ref(false);

function sendMessage() {
  mutateAsync({ chatId, message: messageText.value });

  messageText.value = '';
  snackbarShown.value = true;
}
</script>

<template>
  <VForm class="w-100 d-flex flex-wrap" @submit.prevent="sendMessage">
    <VTextarea v-model="messageText" class="w-100" label="Message" variant="outlined" />
    <VBtn class="ml-auto" type="submit" color="blue">Send</VBtn>
  </VForm>
  <VSnackbar v-model="snackbarShown" :timeout="2000">
    <div>{{ error ? `Message sending failed: ${error}` : 'Message sent!' }}</div>
  </VSnackbar>
</template>
