export interface IUser {
  id: string;
  chatId: string;
  name: string;
  isPremium: boolean;
  deleted: boolean;
  banned: boolean;
  moderator: boolean;
}
