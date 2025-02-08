<script setup lang="ts">
import { ref } from 'vue';
import { useSendMessageToChat } from '@/entities/chat';
import { useGetChatId } from '@/shared/lib';
import { useGetChatPlatform } from '../lib/useGetChatPlatform.ts';

const chatId = useGetChatId();
const { platform } = useGetChatPlatform(chatId);
const { mutateAsync, isPending, error } = useSendMessageToChat(platform, chatId);
const messageText = ref('');
const snackbarShown = ref(false);

function sendMessage() {
  mutateAsync({ chatId, message: messageText.value })
    .then(() => {
      messageText.value = '';
    })
    .finally(() => {
      snackbarShown.value = true;
    });
}
</script>

<template>
  <VForm class="w-100 d-flex flex-wrap" @submit.prevent="sendMessage">
    <VTextarea v-model="messageText" class="w-100" label="Message" variant="outlined" />
    <VBtn class="ml-auto" type="submit" color="blue" :loading="isPending">Send</VBtn>
  </VForm>
  <VSnackbar v-model="snackbarShown" :timeout="2000">
    <div>{{ error ? `Message sending failed: ${error.message}` : 'Message sent!' }}</div>
  </VSnackbar>
</template>
