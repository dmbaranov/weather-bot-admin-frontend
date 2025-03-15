import { useMutation, useQuery } from '@tanstack/vue-query';
import { chatConfigApi } from '../api/chatConfigApi';
import { UpdateChatConfigDTO } from '../api/types.ts';
import { queryClient } from '@/shared/api';

const CHAT_CONFIG_QUERY_KEY = 'chatconfig';

export function useGetChatConfig(chatId: string) {
  return useQuery({
    queryKey: [CHAT_CONFIG_QUERY_KEY, chatId],
    queryFn: ({ queryKey }) => chatConfigApi.getChatConfig(queryKey[1])
  });
}

export function useUpdateChatConfig() {
  return useMutation({
    mutationFn: (config: UpdateChatConfigDTO) => chatConfigApi.updateChatConfig(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHAT_CONFIG_QUERY_KEY] });
    }
  });
}
