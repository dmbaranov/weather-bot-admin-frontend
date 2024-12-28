<script setup lang="ts">
import { ref } from 'vue';
import { useGetChatUsers } from '@/entities/user';
import { Table } from '@/widgets/Table';
import { User } from '@/entities/user';
import { UpdateUserDialog } from '@/features/users';
import { useGetChatId } from '@/features/chat';

const chatId = useGetChatId();
const { data: users, error } = useGetChatUsers(chatId);
const userToUpdate = ref<User | undefined>();

function handleEdit(user: User) {
  userToUpdate.value = user;
}
</script>

<template>
  <VContainer class="fill-height align-start">
    <VAlert v-if="error" title="Something went wrong" :text="error.message" type="error" />
    <Table :items="users ?? []" @edit="handleEdit" />
    <UpdateUserDialog v-if="userToUpdate" :chat-id="chatId" :user-to-update="userToUpdate" @close="userToUpdate = undefined" />
  </VContainer>
</template>
