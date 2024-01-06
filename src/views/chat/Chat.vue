<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { chatApi, sharedChatQueryParams } from '@/api/chat';
import type { Platform } from '@/models/Platform';
import { computed } from 'vue';

interface Link {
  title: string;
  to: string;
}

const route = useRoute();
const router = useRouter();
const chatId = route.params.chatId as string;

const platformLinks: Record<Platform, Link[]> = {
  discord: [{ title: 'Herojob', to: 'Herojob' }],
  telegram: [{ title: 'Accordion', to: 'Accordion' }]
};

const { data: chat } = useQuery({
  ...sharedChatQueryParams,
  queryKey: [...sharedChatQueryParams.queryKey, chatId],
  queryFn: ({ queryKey }) => chatApi.getSingle(queryKey[1]),
  select: (response) => response.data
});

let commonLinks: Link[] = [{ title: 'Users', to: 'ChatUsers' }];

const allLinks = computed<Link[]>(() => {
  if (!chat.value) return commonLinks;

  return [...commonLinks, ...platformLinks[chat.value.platform]];
});
</script>

<template>
  <VNavigationDrawer :model-value="true" permanent>
    <VListItem v-for="link in allLinks" :key="link.to" link @click="router.push({ name: link.to })">
      {{ link.title }}
    </VListItem>
  </VNavigationDrawer>
  <RouterView />
</template>
