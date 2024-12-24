import { useMutation, useQuery } from '@tanstack/vue-query';
import { Platform } from '@/shared';
import { chatApi } from '../api/chatApi';
import { SendMessageDTO, SetChatSwearwordsDTO } from '../api/types.ts';

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

export function useSendMessageToChat(chatId: string) {
  return useMutation({
    mutationKey: [CHAT_QUERY_KEY],
    mutationFn: (message: SendMessageDTO) => chatApi.sendMessage(chatId, message)
  });
}

export function useGetChatSwearwords() {
  return useQuery({
    queryKey: [CHAT_QUERY_KEY],
    queryFn: chatApi.getChatSwearwords
  });
}

export function useSetChatSwearwords(chatId: string) {
  return useMutation({
    mutationKey: [CHAT_QUERY_KEY, chatId],
    mutationFn: ({ platform, data }: { platform: Platform; data: SetChatSwearwordsDTO }) =>
      chatApi.setChatSwearwords(platform, chatId, data)
  });
}
