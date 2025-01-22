<script setup lang="ts">
import { computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { Line } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { Statistics, useGetChatStatistics } from '@/entities/statistics';

Chart.register(...registerables);

const chatId = useGetChatId();
const { data: statistics } = useGetChatStatistics(chatId);

const allCommandsByDate = computed(() => {
  if (!statistics.value) return { labels: [], datasets: [] };

  const mappedStatistics = statistics.value.reduce((acc: Record<string, number>, item: Statistics) => {
    const commandMonth = new Date(item.timestamp).getMonth() + 1;
    const commandYear = new Date(item.timestamp).getFullYear();
    const key = `${commandMonth}/${commandYear}`;

    return {
      ...acc,
      [key]: acc[key] ? acc[key] + 1 : 1
    };
  }, {});

  const sortedKeysByMonthAndYear = Object.keys(mappedStatistics).sort((a, b) => {
    const [aMonth, aYear] = a.split('/');
    const [bMonth, bYear] = b.split('/');

    if (aYear === bYear) {
      return Number(aMonth) - Number(bMonth);
    }

    return Number(aYear) - Number(bYear);
  });

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
