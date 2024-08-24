import { api } from './api';
import { IUser } from '@/models/User.ts';

interface GetUserDTO {
  id: {
    chatId: string;
    botUserId: string;
  };
  botUser: {
    id: string;
    name: string;
    isPremium: boolean;
  };
  deleted: boolean;
  banned: boolean;
  moderator: boolean;
}

export interface UpdateUserDTO {
  name: string;
  deleted: boolean;
  banned: boolean;
  moderator: boolean;
}

export const userApi = {
  async getChatUsers(chatId: string) {
    return api.get<GetUserDTO[]>('/v1/members?chatId=' + chatId).then(({ data }) => data.map(mapUserResponseToUser));
  },
  async updateChatUser(chatId: string, userId: string, user: UpdateUserDTO) {
    return api.put(`/v1/members/${chatId}/${userId}`, user);
  }
};

function mapUserResponseToUser(userResponse: GetUserDTO): IUser {
  const { id, botUser, ...rest } = userResponse;

  return {
    chatId: id.chatId,
    ...botUser,
    ...rest
  };
}
