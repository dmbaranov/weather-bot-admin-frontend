<script setup lang="ts">
import { computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { Statistics, useGetChatStatistics } from '@/entities/statistics/';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);

const topCommands = computed(() => {
  if (!statistics.value) return { labels: [], datasets: [] };

  const commandInvocationsMap = statistics.value.reduce(
    (acc: Record<string, number>, command: Statistics) => ({
      ...acc,
      [command.command]: acc[command.command] ? acc[command.command] + 1 : 1
    }),
    {}
  );

  return {
    labels: ['Number of commands used'],
    datasets: Object.entries(commandInvocationsMap).map(([command, invocations]) => ({
      label: command,
      data: [invocations]
    }))
  };
});
</script>

<template>
  <Bar :data="topCommands" />
</template>
