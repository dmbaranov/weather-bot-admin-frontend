import { z } from 'zod';

export const StatisticsSchema = z.object({
  id: z.number(),
  chatId: z.string(),
  botUserId: z.string(),
  command: z.string(),
  timestamp: z.date()
});
