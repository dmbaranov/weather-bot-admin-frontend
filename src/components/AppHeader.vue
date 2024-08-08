<script setup lang="ts">
import weatherIcon from '@/assets/weather-icon.jpg';
</script>

<template>
  <VAppBar>
    <VAppBarTitle>
      <RouterLink
        :to="{ name: 'Dashboard' }"
        class="link"
      >
        Weather Bot Admin Panel
      </RouterLink>
    </VAppBarTitle>
    <VSpacer />
    <VImg
      :src="weatherIcon"
      position="right"
      class="mr-2"
      max-height="90%"
    />
  </VAppBar>
</template>

<style lang="scss" scoped>
.link {
  color: inherit;
  text-decoration: none;
}
</style>
