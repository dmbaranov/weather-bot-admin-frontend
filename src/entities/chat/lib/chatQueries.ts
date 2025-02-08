import { Ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { Platform } from '@/shared/model';
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

export function useGetChatSwearwords() {
  return useQuery({
    queryKey: [CHAT_QUERY_KEY, 'swearwords'],
    queryFn: chatApi.getChatSwearwords
  });
}

export function useSendMessageToChat(platform: Ref<Platform | undefined>, chatId: string) {
  return useMutation({
    mutationFn: (message: SendMessageDTO) => {
      if (!platform?.value) {
        throw new Error('Platform is missing');
      }

      return chatApi.sendMessage(platform.value, chatId, message);
    }
  });
}

export function useSetChatSwearwords(platform: Ref<Platform | undefined>, chatId: string) {
  return useMutation({
    mutationFn: (data: SetChatSwearwordsDTO) => {
      if (!platform?.value) {
        throw new Error('Platform is missing');
      }

      return chatApi.setChatSwearwords(platform.value, chatId, data);
    }
  });
}
