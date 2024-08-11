import { useQuery } from '@tanstack/vue-query';
import { userApi } from '@/api/user.ts';

const USER_QUERY_KEY = 'user';

export function useGetChatUsers(chatId: string) {
  return useQuery({
    queryKey: [USER_QUERY_KEY, chatId],
    queryFn: ({ queryKey }) => userApi.getChatUsers(queryKey[1])
  });
}
