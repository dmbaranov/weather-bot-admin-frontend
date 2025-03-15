import { baseApi } from '@/shared/api';
import { ChatConfig } from '../model/types';
import { mapChatConfig } from '../lib/mapChatConfig';
import { GetChatConfigDTO, UpdateChatConfigDTO } from './types';

export const chatConfigApi = {
  async getChatConfig(chatId: string): Promise<ChatConfig | null> {
    return baseApi.get<GetChatConfigDTO>(`/v1/chatconfig/${chatId}`).then(({ data }) => mapChatConfig(data));
  },

  async createChatConfig(chatId: string): Promise<void> {
    return baseApi.post(`/v1/chatconfig/${chatId}`);
  },

  async updateChatConfig(config: UpdateChatConfigDTO): Promise<ChatConfig> {
    return baseApi.put<GetChatConfigDTO>(`/v1/chatconfig`, config).then(({ data }) => mapChatConfig(data));
  }
};
