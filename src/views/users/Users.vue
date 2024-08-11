<script setup lang="ts">
import { useGetChatUsers } from '@/queries/user.ts';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId;
const { data: users, error } = useGetChatUsers(chatId);
const searchTerm = ref('');
</script>

<template>
  <VContainer class="fill-height align-start">
    <VAlert v-if="error" title="Something went wrong" :text="error.message" type="error" />

    <VCard v-else class="w-100">
      <template #text>
        <VTextField v-model="searchTerm" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details class="ma-6" />
      </template>
      <VDataTable :items="users" :search="searchTerm" />
    </VCard>
  </VContainer>
</template>
