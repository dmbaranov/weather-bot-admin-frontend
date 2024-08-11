import type { IChat } from '@/models/Chat';
import { Platform } from '@/models/Platform.ts';
import { getEnumValue } from '@/utils';
import { api } from './api';

interface ChatResponse {
  id: string;
  name: string;
  platform: string;
  swearwordsConfig: string;
}

export const chatApi = {
  async getAll() {
    return api.get<ChatResponse[]>('/v1/chats').then(({ data }) => data.map(mapChatResponseToChat));
  },
  async getSingle(chatId: string) {
    return api.get<ChatResponse>(`/v1/chats/${chatId}`).then(({ data }) => mapChatResponseToChat(data));
  }
};

function mapChatResponseToChat(chatResponse: ChatResponse): IChat {
  return {
    ...chatResponse,
    platform: getEnumValue(Platform, chatResponse.platform)
  };
}
