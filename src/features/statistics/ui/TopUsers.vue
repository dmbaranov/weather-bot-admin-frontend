<script setup lang="ts">
import { computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { Statistics, useGetChatStatistics } from '@/entities/statistics/';
import { useGetChatUsers } from '@/entities/user';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);
const { data: users } = useGetChatUsers(chatId);

const numberOfCommandsUsedByUserData = computed(() => {
  if (!users.value || !statistics.value) return { labels: [], datasets: [] };

  const commandToUserIdMap = statistics.value.reduce(
    (acc: Record<string, number>, command: Statistics) => ({
      ...acc,
      [command.botUserId]: acc[command.botUserId] ? acc[command.botUserId] + 1 : 1
    }),
    {}
  );

  return {
    labels: ['Number of commands used'],
    datasets: Object.entries(commandToUserIdMap)
      .sort((a, b) => b[1] - a[1])
      .map(([userId, commands]) => ({
        label: users.value.find((u) => u.id === userId)?.name ?? 'Unknown user',
        data: [commands]
      }))
  };
});
</script>

<template>
  <Bar :data="numberOfCommandsUsedByUserData" />
</template>
