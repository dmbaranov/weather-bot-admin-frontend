import { useQuery } from '@tanstack/vue-query';
import { chatApi } from '../api/chatApi';

const CHAT_QUERY_KEY = 'chat';

export function useGetChats() {
  return useQuery({
    queryKey: [CHAT_QUERY_KEY],
    queryFn: chatApi.getAll
  });
}

export function useGetSingleChat(chatId: string) {
  return useQuery({
    queryKey: [CHAT_QUERY_KEY, chatId],
    queryFn: ({ queryKey }) => chatApi.getSingle(queryKey[1])
  });
}
