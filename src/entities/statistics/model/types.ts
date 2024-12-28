import { z } from 'zod';
import { StatisticsSchema } from '../lib/statisticsSchema';

export type Statistics = z.infer<typeof StatisticsSchema>;
