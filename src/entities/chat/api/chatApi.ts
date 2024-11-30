import { baseApi } from '@/shared';
import { mapChat } from '../lib/mapChat.ts';
import { Chat } from '../model/types';
import { GetChatDTO, SendMessageDTO } from './types';

export const chatApi = {
  async getAll(): Promise<Chat[]> {
    return baseApi.get<GetChatDTO[]>('/v1/chats').then(({ data }) => data.map(mapChat));
  },

  async getSingle(chatId: string): Promise<Chat> {
    return baseApi.get<GetChatDTO>(`/v1/chats/${chatId}`).then(({ data }) => mapChat(data));
  },

  async sendMessage(chatId: string, message: SendMessageDTO): Promise<void> {
    return baseApi.post(`/v1/chats/${chatId}/message`, message);
  }
};
