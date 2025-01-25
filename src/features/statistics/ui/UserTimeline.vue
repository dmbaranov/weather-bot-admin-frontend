<script setup lang="ts">
import { computed, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { useGetChatId } from '@/shared/lib';
import { Statistics, useGetChatStatistics } from '@/entities/statistics';
import { useGetChatUsers } from '@/entities/user';

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

const userCommandsTimeline = computed(() => {
  if (!statistics.value || !users.value || !selectedUser.value) return { labels: [], datasets: [] };

  const userCommands = statistics.value.filter((command) => command.botUserId === selectedUser.value);
  const userTimeline = userCommands.reduce((acc: Record<string, Record<string, number>>, item: Statistics) => {
    const commandMonth = new Date(item.timestamp).getMonth() + 1;
    const commandYear = new Date(item.timestamp).getFullYear();
    const key = `${commandMonth}/${commandYear}`;

    if (acc[key]) {
      if (acc[key][item.command]) {
        return {
          ...acc,
          [key]: {
            ...acc[key],
            [item.command]: acc[key][item.command] + 1
          }
        };
      } else {
        return {
          ...acc,
          [key]: {
            ...acc[key],
            [item.command]: 1
          }
        };
      }
    } else {
      return {
        ...acc,
        [key]: {
          [item.command]: 1
        }
      };
    }
  }, {});

  const allUsedCommands = [...new Set(userCommands.map((command) => command.command))];

  const sortedKeysByMonthAndYear = Object.keys(userTimeline).sort((a, b) => {
    const [aMonth, aYear] = a.split('/');
    const [bMonth, bYear] = b.split('/');

    if (aYear === bYear) {
      return Number(aMonth) - Number(bMonth);
    }

    return Number(aYear) - Number(bYear);
  });

  return {
    labels: sortedKeysByMonthAndYear,
    datasets: allUsedCommands.map((command) => ({
      label: command,
      data: sortedKeysByMonthAndYear.map((date) => userTimeline[date][command] ?? 0)
    }))
  };
});

const chartOptions = {
  responsive: true,
  x: {
    stacked: true
  },
  interaction: {
    mode: 'x'
  },
  plugins: {
    tooltip: {
      filter: (item) => item.raw > 0
    }
  }
};
</script>

<template>
  <VSelect v-model="selectedUser" label="User" variant="outlined" :items="selectableUsers" />
  <Bar :data="userCommandsTimeline" :options="chartOptions" />
  <div style="height: 500px"></div>
</template>
