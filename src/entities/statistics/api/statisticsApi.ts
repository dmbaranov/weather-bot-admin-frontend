import { baseApi } from '@/shared/api';
import { Statistics } from '../model/types';
import { mapStatistics } from '../lib/mapStatistics';
import { GetStatisticsDTO } from './types';

export const statisticsApi = {
  async getChatStatistics(chatId: string): Promise<Statistics[]> {
    return baseApi.get<GetStatisticsDTO[]>(`/v1/statistics/${chatId}`).then(({ data }) => mapStatistics(data));
  }
};
