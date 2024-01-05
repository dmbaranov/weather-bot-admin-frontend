import type { IChat } from '@/models/Chat';
import { api } from './api';

const CHAT_QUERY_KEY = 'chat';

export const chatApi = {
  getAll() {
    return api.get<IChat[]>('/chats');
  },
  getSingle(chatId: string) {
    return api.get<IChat>(`/chats/${chatId}`);
  }
};

export const sharedChatQueryParams = {
  queryKey: [CHAT_QUERY_KEY],
  staleTime: Infinity
};
