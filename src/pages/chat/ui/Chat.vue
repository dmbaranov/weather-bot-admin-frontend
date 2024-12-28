<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGetSingleChat } from '@/entities/chat';
import { useGetChatLinks, useGetChatId } from '@/features/chat';
import { RouteName } from '@/shared/config';

const route = useRoute();
const chatId = useGetChatId();
const { data: chat } = useGetSingleChat(chatId);
const chatLinks = useGetChatLinks(chat);
</script>

<template>
  <VNavigationDrawer :model-value="true" permanent>
    <VListItem v-if="chat" :subtitle="chat.name" />
    <VDivider />
    <VListItem v-for="link in chatLinks" :key="link.to" link :to="{ name: link.to }">
      {{ link.title }}
    </VListItem>
  </VNavigationDrawer>
  <VEmptyState
    v-if="route.name === RouteName.CHAT"
    icon="mdi-application-cog"
    headline="Ahoy!"
    title="You opened chat settings"
    text="Select what you want to do in the left menu"
  />
  <RouterView />
</template>
