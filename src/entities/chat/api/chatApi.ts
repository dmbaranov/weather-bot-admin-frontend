import { baseApi } from '@/shared/api';
import { mapChat } from '../lib/mapChat.ts';
import { GetChatDTO } from './types';

export const chatApi = {
  async getAll() {
    return baseApi.get<GetChatDTO[]>('/v1/chats').then(({ data }) => data.map(mapChat));
  },

  async getSingle(chatId: string) {
    return baseApi.get<GetChatDTO>(`/v1/chats/${chatId}`).then(({ data }) => mapChat(data));
  }
};
