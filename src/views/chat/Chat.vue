<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useChatStore } from '@/stores';

interface Link {
  title: string;
  to: string;
}

const router = useRouter();
const route = useRoute();
const chatStore = useChatStore();
const selectedChat = chatStore.chats.find((chat) => chat.id === route.params.chatId);

const commonLinks: Link[] = [
  {
    title: 'Users',
    to: 'chatUsers'
  }
];

const allLinks = [...commonLinks];

chatStore.fetchAllChats();
</script>

<template>
  <VNavigationDrawer :model-value="true">
    <VListItem v-for="link in allLinks" :key="link.to" link title="Users" :to="{ name: link.to }" />
  </VNavigationDrawer>
  <router-view />
</template>
