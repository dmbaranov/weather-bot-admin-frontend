import { useQuery } from '@tanstack/vue-query';
import { statisticsApi } from '../api/statisticsApi';

const STATISTICS_QUERY_KEY = 'statistics';

export function useGetChatStatistics(chatId: string) {
  return useQuery({
    queryKey: [STATISTICS_QUERY_KEY, chatId],
    queryFn: ({ queryKey }) => statisticsApi.getChatStatistics(queryKey[1])
  });
}
