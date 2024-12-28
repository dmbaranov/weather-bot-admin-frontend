import { GetStatisticsDTO } from '../api/types';
import { Statistics } from '../model/types';
import { StatisticsSchema } from '../lib/statisticsSchema';

export function mapStatistics(dto: GetStatisticsDTO[]): Statistics[] {
  return dto.map((item) =>
    StatisticsSchema.parse({
      ...item,
      timestamp: new Date(item.timestamp)
    })
  );
}
