<script setup lang="ts">
import weatherIcon from '@/assets/weather-icon.jpg'
</script>

<template>
  <VAppBar>
    <VAppBarTitle>Weather Bot Admin Panel</VAppBarTitle>
    <VSpacer />
    <VImg :src="weatherIcon" position="right" class="mr-2" max-height="90%" />
  </VAppBar>
</template>
