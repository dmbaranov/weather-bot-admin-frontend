<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { AxiosError, AxiosResponse } from 'axios';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { AppHeader } from '@/widgets/AppHeader';
import { baseApi } from '@/shared/api';

const showSnackbar = ref(false);

baseApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (Number(error.status) >= 500) {
      showSnackbar.value = true;
    }

    return Promise.reject(error);
  }
);
</script>

<template>
  <VApp>
    <AppHeader />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
  <VSnackbar v-model="showSnackbar" :timeout="5000" color="error">
    <div>Something went wrong, try again later</div>
    <template #actions>
      <VBtn icon="mdi-close" variant="plain" @click="showSnackbar = false" />
    </template>
  </VSnackbar>
  <VueQueryDevtools />
</template>
