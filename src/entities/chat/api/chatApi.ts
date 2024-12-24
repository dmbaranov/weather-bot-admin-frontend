import { baseApi, Platform } from '@/shared';
import { mapChat } from '../lib/mapChat.ts';
import { Chat } from '../model/types';
import { GetChatDTO, SendMessageDTO, SetChatSwearwordsDTO } from './types';

export const chatApi = {
  async getAll(): Promise<Chat[]> {
    return baseApi.get<GetChatDTO[]>('/v1/chats').then(({ data }) => data.map(mapChat));
  },

  async getSingle(chatId: string): Promise<Chat> {
    return baseApi.get<GetChatDTO>(`/v1/chats/${chatId}`).then(({ data }) => mapChat(data));
  },

  async sendMessage(platform: Platform, chatId: string, message: SendMessageDTO): Promise<void> {
    return baseApi.post(`/v1/chats/${platform}/${chatId}/message`, message);
  },

  async getChatSwearwords(): Promise<string[]> {
    return baseApi.get('v1/chats/swearwords').then(({ data }) => data);
  },

  async setChatSwearwords(platform: Platform, chatId: string, data: SetChatSwearwordsDTO): Promise<void> {
    return baseApi.put(`v1/chats/${platform}/${chatId}/swearwords`, data);
  }
};
