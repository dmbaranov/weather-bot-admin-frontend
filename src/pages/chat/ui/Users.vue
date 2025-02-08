<script setup lang="ts">
import { ref } from 'vue';
import { useGetChatUsers } from '@/entities/user';
import { Table } from '@/widgets/Table';
import { User } from '@/entities/user';
import { UpdateUserDialog } from '@/features/users';
import { useGetChatId } from '@/shared/lib';
import { GeneralError } from '@/widgets/Errors';

const chatId = useGetChatId();
const { data: users, isLoading, error } = useGetChatUsers(chatId);
const userToUpdate = ref<User | undefined>();

function handleEdit(user: User) {
  userToUpdate.value = user;
}
</script>

<template>
  <GeneralError :error="error" />
  <VContainer class="fill-height align-start">
    <Table :items="users ?? []" :loading="isLoading" @edit="handleEdit" />
    <UpdateUserDialog v-if="userToUpdate" :chat-id="chatId" :user-to-update="userToUpdate" @close="userToUpdate = undefined" />
  </VContainer>
</template>
