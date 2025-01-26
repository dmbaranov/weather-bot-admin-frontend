<script setup lang="ts">
import { TopUsers, CommandsTimeline, TopCommands, UsersTimeline } from '@/features/statistics';
import { ref } from 'vue';

const selectedTab = ref('Users timeline');

const charts = [
  {
    name: 'Top users',
    component: TopUsers
  },
  {
    name: 'Top commands',
    component: TopCommands
  },
  {
    name: 'Commands timeline',
    component: CommandsTimeline
  },
  {
    name: 'Users timeline',
    component: UsersTimeline
  }
];
</script>

<template>
  <VContainer class="w-75">
    <VTabs v-model="selectedTab" align-tabs="center">
      <VTab v-for="chart in charts" :key="chart.name" :value="chart.name">{{ chart.name }}</VTab>
    </VTabs>
    <VTabsWindow v-model="selectedTab">
      <VTabsWindowItem v-for="chart in charts" :key="chart.name" :value="chart.name">
        <VRow class="my-8 mx-2">
          <component :is="chart.component" />
        </VRow>
      </VTabsWindowItem>
    </VTabsWindow>
  </VContainer>
</template>
