<script setup lang="ts">
import { computed, ref } from 'vue';
import { TopUsers, CommandsTimeline, TopCommands, UsersTimeline } from '@/features/statistics';
import { GeneralError } from '@/widgets/Errors';
import { useGetChatStatistics } from '@/entities/statistics';
import { useGetChatId } from '@/shared/lib';
import { useGetChatUsers } from '@/entities/user';

const chatId = useGetChatId();
const { isLoading: statisticsLoading, error: statisticsError } = useGetChatStatistics(chatId);
const { isLoading: usersLoading, error: usersError } = useGetChatUsers(chatId);

const selectedTab = ref('Top users');
const dataError = computed(() => statisticsError.value ?? usersError.value);

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
  <GeneralError :error="dataError" />
  <VContainer v-if="!dataError" class="w-75 h-100">
    <VRow v-if="statisticsLoading ?? usersLoading" class="h-100 justify-center align-center">
      <VProgressCircular v-if="true" color="primary" indeterminate />
    </VRow>
    <template v-else>
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
    </template>
  </VContainer>
</template>
