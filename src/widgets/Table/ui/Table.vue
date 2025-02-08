<script setup lang="ts" generic="T extends object">
import { computed, ref } from 'vue';
import { VDataTable } from 'vuetify/components';

const { items, loading } = defineProps<{ items: T[]; loading?: boolean }>();
const emit = defineEmits<{
  edit: [item: T];
}>();

const searchTerm = ref('');
const tableHeaders = computed(() => {
  if (!items || !items.length) {
    return [];
  }

  const itemsHeaders = Object.keys(items[0]).map((key) => ({
    title: key,
    key
  }));

  const actionsHeader = {
    title: 'Actions',
    key: 'actions'
  };

  return [...itemsHeaders, actionsHeader];
});
</script>

<template>
  <VCard class="w-100">
    <template #text>
      <VTextField v-model="searchTerm" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details class="ma-6" />
    </template>
    <VDataTable :headers="tableHeaders" :items="items" :search="searchTerm" :loading="loading">
      <template #item.actions="{ item }">
        <VIcon size="small" @click="emit('edit', item)">mdi-pencil</VIcon>
      </template>
    </VDataTable>
  </VCard>
</template>
