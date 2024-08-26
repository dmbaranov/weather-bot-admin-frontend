import { Chat } from '@/entities/chat';
import { Platform } from '@/shared/model/platform';
import { computed, ComputedRef, Ref } from 'vue';

interface Link {
  title: string;
  to: string;
}

export function useGetChatLinks(chat: Ref<Chat | undefined>): ComputedRef<Link[]> {
  const commonLinks: Link[] = [{ title: 'Users', to: 'ChatUsers' }];
  const platformLinks: Record<Platform, Link[]> = {
    discord: [{ title: 'Herojob', to: 'Herojob' }],
    telegram: [{ title: 'Accordion', to: 'Accordion' }]
  };

  return computed<Link[]>(() => {
    if (!chat.value) return commonLinks;
    const chatPlatformLinks = platformLinks[chat.value.platform] ?? [];

    return [...commonLinks, ...chatPlatformLinks];
  });
}
