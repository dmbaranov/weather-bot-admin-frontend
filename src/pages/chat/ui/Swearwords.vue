<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useGetChatSwearwords, useGetSingleChat, useSetChatSwearwords } from '@/entities/chat';
import { getStringRouteParam } from '@/shared';

const route = useRoute();
const chatId = getStringRouteParam(route.params.chatId);
const selectedConfig = ref('');
const { data: swearwords, isLoading: swearwordsLoading } = useGetChatSwearwords();
const { data: chat, isLoading: chatLoading } = useGetSingleChat(chatId);
const { mutate: setChatSwearwords } = useSetChatSwearwords(chatId);
const dataLoading = computed(() => swearwordsLoading.value || chatLoading.value);

watchEffect(() => {
  if (chat.value) {
    selectedConfig.value = chat.value.swearwordsConfig;
  }
});

function updateChatSwearwords() {
  if (chat.value) {
    setChatSwearwords({ platform: chat.value.platform, data: { chatId: chat.value.id, swearwordsConfig: selectedConfig.value } });
  }
}
</script>

<template>
  <VContainer class="fill-height w-75">
    <VRow class="justify-center align-center">
      <VProgressCircular v-if="dataLoading" indeterminate color="primary" />
      <template v-else>
        <VSelect v-model="selectedConfig" class="mr-8" variant="solo" :items="swearwords" hide-details />
        <VBtn color="blue" @click="updateChatSwearwords">Save</VBtn>
      </template>
    </VRow>
  </VContainer>
</template>
