import { Chat } from '@/entities/chat';
import { Platform } from '@/shared/model/platform';

interface Link {
  title: string;
  to: string;
}

export function getChatLinks(chat?: Chat): Link[] {
  const commonLinks: Link[] = [{ title: 'Users', to: 'ChatUsers' }];
  const platformLinks: Record<Platform, Link[]> = {
    discord: [{ title: 'Herojob', to: 'Herojob' }],
    telegram: [{ title: 'Accordion', to: 'Accordion' }]
  };

  if (!chat) return commonLinks;

  const chatPlatformLinks = platformLinks[chat.platform] ?? [];

  return [...commonLinks, ...chatPlatformLinks];
}
