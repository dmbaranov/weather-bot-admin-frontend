<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <VApp>
    <AppHeader />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
  <VueQueryDevtools />
</template>
