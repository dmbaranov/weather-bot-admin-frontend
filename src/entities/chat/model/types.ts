import { z } from 'zod';
import { ChatSchema } from '../lib/chatSchema';

export type Chat = z.infer<typeof ChatSchema>;
