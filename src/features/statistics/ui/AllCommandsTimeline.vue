<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { Chart, ChartData, registerables } from 'chart.js';
import { Line } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { Statistics, useGetChatStatistics } from '@/entities/statistics';
import { sortMonthYearKeys } from '../lib/chartUtils.ts';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);

const allCommandsByDate: ComputedRef<ChartData<'line'>> = computed(() => {
  if (!statistics.value) return { labels: [], datasets: [] };

  const mappedStatistics = statistics.value.reduce((acc: Record<string, number>, { timestamp }: Statistics) => {
    const date = new Date(timestamp);
    const key = `${date.getMonth() + 1}/${date.getFullYear()}`;
    acc[key] ??= 0;
    acc[key] += 1;

    return acc;
  }, {});

  const sortedKeysByMonthAndYear = sortMonthYearKeys(mappedStatistics);

  return {
    labels: sortedKeysByMonthAndYear,
    datasets: [
      {
        label: 'Command invocations',
        data: sortedKeysByMonthAndYear.map((key) => mappedStatistics[key])
      }
    ]
  };
});
</script>

<template>
  <Line :data="allCommandsByDate" />
</template>
