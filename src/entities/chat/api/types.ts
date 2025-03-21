export interface GetChatDTO {
  id: string;
  platform: string;
  name: string;
  swearwordsConfig: string;
}

export interface SendMessageDTO {
  chatId: string;
  message: string;
}

export interface SetChatSwearwordsDTO {
  chatId: string;
  swearwordsConfig: string;
}
