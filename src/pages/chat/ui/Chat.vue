<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useGetSingleChat } from '@/entities/chat';
import { useGetChatLinks } from '@/features/chat';

const route = useRoute();
const router = useRouter();
const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId;
const { data: chat } = useGetSingleChat(chatId);
const chatLinks = useGetChatLinks(chat);
</script>

<template>
  <VNavigationDrawer :model-value="true" permanent>
    <VListItem v-for="link in chatLinks" :key="link.to" link @click="router.push({ name: link.to })">
      {{ link.title }}
    </VListItem>
  </VNavigationDrawer>
  <RouterView />
</template>
