<script setup lang="ts">
import { getErrorMessage } from '../lib/getErrorMessage';

const { error } = defineProps<{ error: unknown }>();
</script>

<template>
  <VEmptyState v-if="error" icon="mdi-alert" title="Something went wrong" :text="getErrorMessage(error)" />
</template>
