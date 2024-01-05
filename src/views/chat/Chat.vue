<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { chatApi, sharedChatQueryParams } from '@/api/chat';
import type { Platform } from '@/models/Platform';
import { computed } from 'vue';

interface Link {
  title: string;
  to: string;
}

const route = useRoute();
const chatId = route.params.chatId as string;

const platformLinks: Record<Platform, Link[]> = {
  discord: [{ title: 'Herojob', to: 'herojob' }],
  telegram: [{ title: 'Accordion', to: 'accordion' }]
};

const { data: chat } = useQuery({
  ...sharedChatQueryParams,
  queryKey: [...sharedChatQueryParams.queryKey, chatId],
  queryFn: ({ queryKey }) => chatApi.getSingle(queryKey[1]),
  select: (response) => response.data
});

let commonLinks: Link[] = [
  {
    title: 'Users',
    to: 'chatUsers'
  }
];

const allLinks = computed<Link[]>(() => {
  if (!chat.value) return commonLinks;

  return [...commonLinks, ...platformLinks[chat.value.platform]];
});
</script>

<template>
  <VNavigationDrawer :model-value="true" permanent>
    <VListItem v-for="link in allLinks" :key="link.to" link :title="link.title" :to="{ name: link.to }" />
  </VNavigationDrawer>
  <router-view />
</template>
