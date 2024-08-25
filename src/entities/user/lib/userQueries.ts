import { useMutation, useQuery } from '@tanstack/vue-query';
import { queryClient } from '@/shared/api';
import { UpdateUserDTO } from '../api/types';
import { userApi } from '../api/userApi';

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
