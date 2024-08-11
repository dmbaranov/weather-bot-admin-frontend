<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Platform } from '@/models/Platform';
import { useGetSingleChat } from '@/queries/chat.ts';

interface Link {
  title: string;
  to: string;
}

const route = useRoute();
const router = useRouter();
const chatId = route.params.chatId as string;

const commonLinks: Link[] = [{ title: 'Users', to: 'ChatUsers' }];
const platformLinks: Record<Platform, Link[]> = {
  discord: [{ title: 'Herojob', to: 'Herojob' }],
  telegram: [{ title: 'Accordion', to: 'Accordion' }]
};

const { data: chat } = useGetSingleChat(chatId);

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
