<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGetSingleChat } from '@/entities/chat';
import { useGetChatLinks } from '@/features/chat';
import { getStringRouteParam, RouteName } from '@/shared';

const route = useRoute();
const chatId = getStringRouteParam(route.params.chatId);
const { data: chat } = useGetSingleChat(chatId);
const chatLinks = useGetChatLinks(chat);
</script>

<template>
  <VNavigationDrawer :model-value="true" permanent>
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
