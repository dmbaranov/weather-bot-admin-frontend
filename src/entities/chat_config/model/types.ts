import { z } from 'zod';
import { ChatConfigSchema } from '../lib/chatConfigSchema';

export type ChatConfig = z.infer<typeof ChatConfigSchema>;
