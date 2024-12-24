import { useGetSingleChat } from '@/entities/chat';
import { computed } from 'vue';

export function useGetChatPlatform(chatId: string) {
  const { data: chat, isLoading } = useGetSingleChat(chatId);

  const platform = computed(() => chat.value?.platform);

  return { platform, isLoading };
}
