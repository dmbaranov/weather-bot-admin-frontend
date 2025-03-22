<script setup lang="ts">
import { computed } from 'vue';
import { getErrorMessage } from '../lib/getErrorMessage';
import { isNotFoundError } from '../lib/getErrorType';

const { error, ignoreNotFound = true } = defineProps<{ error: unknown; ignoreNotFound?: boolean }>();

const shouldShowError = computed(() => {
  if (ignoreNotFound && isNotFoundError(error)) {
    return false;
  }

  return true;
});
</script>

<template>
  <VEmptyState v-if="error && shouldShowError" icon="mdi-alert" title="Something went wrong" :text="getErrorMessage(error)" />
</template>
