<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGetChatSwearwords, useGetSingleChat, useSetChatSwearwords } from '@/entities/chat';
import { getStringRouteParam } from '@/shared/lib';
import { useGetChatPlatform } from '../lib/useGetChatPlatform';

const route = useRoute();
const chatId = getStringRouteParam(route.params.chatId);
const selectedConfig = ref('');
const { data: swearwords, isLoading: swearwordsLoading } = useGetChatSwearwords();
const { data: chat } = useGetSingleChat(chatId);
const { platform, isLoading: chatPlatformLoading } = useGetChatPlatform(chatId);
const { mutate: setChatSwearwords } = useSetChatSwearwords(platform, chatId);
const dataLoading = computed(() => swearwordsLoading.value || chatPlatformLoading.value);

watchEffect(() => {
  if (chat.value) {
    selectedConfig.value = chat.value.swearwordsConfig;
  }
});

function updateChatSwearwords() {
  if (chat.value) {
    setChatSwearwords({ chatId: chat.value.id, swearwordsConfig: selectedConfig.value });
  }
}
</script>

<template>
  <VProgressCircular v-if="dataLoading" indeterminate color="primary" />
  <template v-else>
    <VSelect v-model="selectedConfig" class="mr-8" variant="solo" :items="swearwords" hide-details />
    <VBtn color="blue" @click="updateChatSwearwords">Save</VBtn>
  </template>
</template>
