export interface GetUserDTO {
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
