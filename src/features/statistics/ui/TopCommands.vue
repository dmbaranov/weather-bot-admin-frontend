<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { Chart, ChartData, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { useGetChatStatistics } from '@/entities/statistics/';
import { getGroupedData } from '../lib/chartUtils';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);

const topCommands: ComputedRef<ChartData<'bar'>> = computed(() => {
  if (!statistics.value) return { labels: [], datasets: [] };

  const commandInvocationsMap = getGroupedData(statistics.value, 'command');

  return {
    labels: ['Number of commands used'],
    datasets: Object.entries(commandInvocationsMap)
      .sort((a, b) => b[1] - a[1])
      .map(([command, invocations]) => ({
        label: command,
        data: [invocations]
      }))
  };
});
</script>

<template>
  <Bar :data="topCommands" />
</template>
