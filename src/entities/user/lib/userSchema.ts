import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  name: z.string(),
  isPremium: z.boolean(),
  deleted: z.boolean(),
  banned: z.boolean(),
  moderator: z.boolean()
});
