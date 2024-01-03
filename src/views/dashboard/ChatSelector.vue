<script setup lang="ts">
import type { IChat } from '@/models/Chat'

defineProps<{
  chat: IChat
}>()
</script>

<template>
  <div>{{ chat.name }}</div>
</template>
