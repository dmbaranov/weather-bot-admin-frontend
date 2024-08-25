import { z } from 'zod';
import { UserSchema } from '../lib/userSchema';

export type User = z.infer<typeof UserSchema>;
