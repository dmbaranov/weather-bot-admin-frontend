<script setup lang="ts">
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { AppHeader } from '@/widgets/AppHeader';
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
