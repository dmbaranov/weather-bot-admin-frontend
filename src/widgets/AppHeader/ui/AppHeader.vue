<script setup lang="ts">
import { WeatherIcon } from '@/shared/ui';
</script>

<template>
  <VAppBar>
    <VAppBarTitle>
      <RouterLink :to="{ name: 'Dashboard' }" class="link"> Weather Bot Admin Panel </RouterLink>
    </VAppBarTitle>
    <VSpacer />
    <VImg :src="WeatherIcon" position="right" class="mr-2" max-height="90%" />
  </VAppBar>
</template>

<style lang="scss" scoped>
.link {
  color: inherit;
  text-decoration: none;
}
</style>
