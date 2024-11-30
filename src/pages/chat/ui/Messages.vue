<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getStringRouteParam } from '@/shared';
import { sendMessageToChat } from '@/entities/chat/lib/chatQueries.ts';

const route = useRoute();
const chatId = getStringRouteParam(route.params.chatId);
const { mutate } = sendMessageToChat(chatId);
const messageText = ref('');

function sendMessage() {
  mutate({ message: 'qwe' });
}
</script>

<template>
  <VContainer class="fill-height w-75">
    <VRow>
      <VForm class="w-100 d-flex flex-wrap" @submit.prevent="sendMessage">
        <VTextarea v-model="messageText" class="w-100" label="Message" variant="outlined" />
        <VBtn class="ml-auto" type="submit" color="blue">Send</VBtn>
      </VForm>
    </VRow>
  </VContainer>
</template>
