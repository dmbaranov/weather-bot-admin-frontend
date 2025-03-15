export interface GetChatConfigDTO {
  id: number;
  chatId: string;
  config: string;
}

export interface UpdateChatConfigDTO {
  chatId: string;
  config: string;
}
