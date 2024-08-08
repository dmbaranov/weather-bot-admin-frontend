<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Platform } from '@/models/Platform';
import type { IChat } from '@/models/Chat';

interface Link {
  title: string;
  to: string;
}

const { chat } = defineProps<{ chat: IChat }>();
const router = useRouter();

const commonLinks: Link[] = [{ title: 'Users', to: 'ChatUsers' }];
const platformLinks: Record<Platform, Link[]> = {
  discord: [{ title: 'Herojob', to: 'Herojob' }],
  telegram: [{ title: 'Accordion', to: 'Accordion' }]
};

const allLinks = computed<Link[]>(() => {
  if (!chat) return commonLinks;

  return [...commonLinks, ...platformLinks[chat.platform]];
});
</script>

<template></template>
