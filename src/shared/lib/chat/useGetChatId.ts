import { useRoute } from 'vue-router';
import { getStringRouteParam } from '@/shared/lib';

export function useGetChatId(): string {
  const route = useRoute();

  return getStringRouteParam(route.params.chatId);
}
