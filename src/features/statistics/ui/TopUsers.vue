<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { Chart, ChartData, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { useGetChatStatistics } from '@/entities/statistics/';
import { useGetChatUsers } from '@/entities/user';
import { getGroupedData } from '../lib/chartUtils';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);
const { data: users } = useGetChatUsers(chatId);

const numberOfCommandsUsedByUserData: ComputedRef<ChartData<'bar'>> = computed(() => {
  if (!users.value || !statistics.value) return { labels: [], datasets: [] };

  const commandToUserIdMap = getGroupedData(statistics.value, 'botUserId');

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
