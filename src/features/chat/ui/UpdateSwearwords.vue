<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { useGetChatSwearwords, useGetSingleChat, useSetChatSwearwords } from '@/entities/chat';
import { useGetChatPlatform } from '../lib/useGetChatPlatform';
import { useGetChatId } from '@/shared/lib';

const chatId = useGetChatId();
const selectedConfig = ref('');
const snackbarShown = ref(false);
const { data: swearwords, isLoading: swearwordsLoading } = useGetChatSwearwords();
const { data: chat } = useGetSingleChat(chatId);
const { platform, isLoading: chatPlatformLoading } = useGetChatPlatform(chatId);
const {
  mutateAsync: setChatSwearwords,
  error: swearwordsUpdateError,
  isPending: swearwordsUpdatePending
} = useSetChatSwearwords(platform, chatId);
const dataLoading = computed(() => swearwordsLoading.value || chatPlatformLoading.value);

watchEffect(() => {
  if (chat.value) {
    selectedConfig.value = chat.value.swearwordsConfig;
  }
});

function updateChatSwearwords() {
  if (chat.value) {
    setChatSwearwords({ chatId: chat.value.id, swearwordsConfig: selectedConfig.value }).finally(() => {
      snackbarShown.value = true;
    });
  }
}
</script>

<template>
  <VProgressCircular v-if="dataLoading" indeterminate color="primary" />
  <template v-else>
    <VSelect v-model="selectedConfig" class="mr-8" variant="solo" :items="swearwords" hide-details />
    <VBtn color="blue" :loading="swearwordsUpdatePending" @click="updateChatSwearwords">Save</VBtn>
  </template>
  <VSnackbar v-model="snackbarShown" :timeout="2000">
    <div>{{ swearwordsUpdateError ? `Swearwords update failed: ${swearwordsUpdateError.message}` : 'Swearwords config updated!' }}</div>
  </VSnackbar>
</template>
