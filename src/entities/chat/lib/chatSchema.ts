import { z } from 'zod';
import { Platform } from '@/shared/model';

export const ChatSchema = z.object({
  id: z.string(),
  platform: z.nativeEnum(Platform),
  name: z.string(),
  swearwordsConfig: z.string()
});
