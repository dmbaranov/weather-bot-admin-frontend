import { computed, ComputedRef, Ref } from 'vue';
import { Chat } from '@/entities/chat';
import { Platform, RouteName } from '@/shared';

interface Link {
  title: string;
  to: string;
}

export function useGetChatLinks(chat: Ref<Chat | undefined>): ComputedRef<Link[]> {
  const commonLinks: Link[] = [
    { title: 'Users', to: RouteName.CHAT_USERS },
    { title: 'Messages', to: RouteName.MESSAGES }
  ];
  const platformLinks: Record<Platform, Link[]> = {
    discord: [{ title: 'Herojob', to: RouteName.HEROJOB }],
    telegram: [{ title: 'Accordion', to: RouteName.ACCORDION }]
  };

  return computed<Link[]>(() => {
    if (!chat.value) return commonLinks;
    const chatPlatformLinks = platformLinks[chat.value.platform] ?? [];

    return [...commonLinks, ...chatPlatformLinks];
  });
}
