<script setup lang="ts">
import { useGetChatId } from '@/features/chat';
import { useGetChatStatistics } from '@/entities/statistics/';

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);
</script>

<template>
  <div>Statistics</div>
  <pre>{{ statistics }}</pre>
</template>
