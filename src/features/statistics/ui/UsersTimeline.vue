<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { Statistics, useGetChatStatistics } from '@/entities/statistics';
import { useGetChatUsers } from '@/entities/user';
import { sortMonthYearKeys } from '../lib/chartUtils';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);
const { data: users } = useGetChatUsers(chatId);
const selectedUser = ref('');

const selectableUsers = computed(() => {
  if (!users.value) return [];

  return users.value.map((u) => ({
    title: u.name,
    value: u.id
  }));
});

const userCommandsTimeline: ComputedRef<ChartData<'bar'>> = computed(() => {
  if (!statistics.value || !users.value || !selectedUser.value) return { labels: [], datasets: [] };

  const userCommands = statistics.value.filter((command) => command.botUserId === selectedUser.value);
  const userTimeline = userCommands.reduce((acc: Record<string, Record<string, number>>, { command, timestamp }: Statistics) => {
    const date = new Date(timestamp);
    const key = `${date.getMonth() + 1}/${date.getFullYear()}`;

    acc[key] ??= {};
    acc[key][command] ??= 0;
    acc[key][command] += 1;

    return acc;
  }, {});

  const allUsedCommands = [...new Set(userCommands.map((command) => command.command))];

  const sortedKeysByMonthAndYear = sortMonthYearKeys(userTimeline);

  return {
    labels: sortedKeysByMonthAndYear,
    datasets: allUsedCommands.map((command) => ({
      label: command,
      data: sortedKeysByMonthAndYear.map((date) => userTimeline[date][command] ?? 0)
    }))
  };
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  scales: {
    x: {
      stacked: true
    }
  },
  interaction: {
    mode: 'x'
  },
  plugins: {
    tooltip: {
      filter: (item) => Number(item.raw) > 0
    }
  }
};
</script>

<template>
  <VAutocomplete v-model="selectedUser" label="User" variant="outlined" :items="selectableUsers" />
  <Bar v-if="selectedUser" :data="userCommandsTimeline" :options="chartOptions" />
</template>
