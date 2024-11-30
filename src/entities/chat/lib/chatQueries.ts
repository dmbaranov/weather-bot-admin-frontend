import { useMutation, useQuery } from '@tanstack/vue-query';
import { chatApi } from '../api/chatApi';
import { SendMessageDTO } from '@/entities/chat/api/types.ts';

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

export function sendMessageToChat(chatId: string) {
  return useMutation({
    mutationKey: [CHAT_QUERY_KEY],
    mutationFn: (message: SendMessageDTO) => chatApi.sendMessage(chatId, message)
  });
}
