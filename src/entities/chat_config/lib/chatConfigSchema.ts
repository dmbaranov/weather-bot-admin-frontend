import { z } from 'zod';

const ConversatorSchema = z.object({
  instructions: z.string().optional()
});

const NewsSchema = z.object({
  disabled: z.boolean().optional()
});

export const ChatConfigSchema = z.object({
  chatId: z.string(),
  config: z.object({
    conversator: ConversatorSchema.optional(),
    news: NewsSchema.optional()
  })
});
