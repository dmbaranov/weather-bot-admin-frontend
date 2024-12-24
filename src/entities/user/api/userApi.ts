import { baseApi } from '@/shared/api';
import { mapUser } from '../lib/mapUser';
import { GetUserDTO, UpdateUserDTO } from './types.ts';

export const userApi = {
  async getChatUsers(chatId: string) {
    return baseApi.get<GetUserDTO[]>('/v1/members?chatId=' + chatId).then(({ data }) => data.map(mapUser));
  },

  async updateChatUser(chatId: string, userId: string, user: UpdateUserDTO) {
    return baseApi.put(`/v1/members/${chatId}/${userId}`, user);
  }
};
