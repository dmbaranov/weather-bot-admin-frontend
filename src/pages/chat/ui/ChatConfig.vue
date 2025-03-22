<script lang="ts" setup>
import { UpdateChatConfig, CreateChatConfig } from '@/features/chat';
import { useGetChatId } from '@/shared/lib';
import { useGetChatConfig } from '@/entities/chat_config';
import { GeneralError } from '@/widgets/Errors';

const chatId = useGetChatId();
const { data: chatConfig, isLoading: chatConfigLoading, error: chatConfigError } = useGetChatConfig(chatId);
</script>

<template>
  <GeneralError :error="chatConfigError" />
  <VContainer class="fill-height flex-nowrap">
    <VRow class="justify-center">
      <VProgressCircular v-if="chatConfigLoading" />
      <template v-else>
        <CreateChatConfig v-if="!chatConfig" />
        <UpdateChatConfig v-else />
      </template>
    </VRow>
  </VContainer>
</template>
