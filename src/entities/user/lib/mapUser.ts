import { GetUserDTO } from '../api/types.ts';
import { User } from '../model/types';
import { UserSchema } from '../lib/userSchema';

export function mapUser(dto: GetUserDTO): User {
  const { id, botUser, ...rest } = dto;

  return UserSchema.parse({
    chatId: id.chatId,
    ...botUser,
    ...rest
  });
}
