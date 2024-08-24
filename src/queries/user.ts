import { useQuery, useMutation } from '@tanstack/vue-query';
import { userApi, UpdateUserDTO } from '@/api/user.ts';
import { queryClient } from './query';

const USER_QUERY_KEY = 'user';

export function useGetChatUsers(chatId: string) {
  return useQuery({
    queryKey: [USER_QUERY_KEY, chatId],
    queryFn: ({ queryKey }) => userApi.getChatUsers(queryKey[1])
  });
}

export function updateChatUser(chatId: string) {
  return useMutation({
    mutationKey: [USER_QUERY_KEY],
    mutationFn: ({ userId, user }: { userId: string; user: UpdateUserDTO }) => userApi.updateChatUser(chatId, userId, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    }
  });
}
