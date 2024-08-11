import { api } from './api';
import { IUser } from '@/models/User.ts';

interface UserResponse {
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

export const userApi = {
  async getChatUsers(chatId: string) {
    return api.get<UserResponse[]>('/v1/members?chatId=' + chatId).then(({ data }) => data.map(mapUserResponseToUser));
  }
};

function mapUserResponseToUser(userResponse: UserResponse): IUser {
  const { id, botUser, ...rest } = userResponse;

  return {
    chatId: id.chatId,
    ...botUser,
    ...rest
  };
}
