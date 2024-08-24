<script setup lang="ts">
import { updateChatUser, useGetChatUsers } from '@/queries/user.ts';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { VDataTable } from 'vuetify/components';
import EditUserModal from '@/views/users/EditUserModal.vue';
import { IUser } from '@/models/User.ts';

const route = useRoute();
const chatId = Array.isArray(route.params.chatId) ? route.params.chatId[0] : route.params.chatId;
const { data: users, error } = useGetChatUsers(chatId);
const { mutate } = updateChatUser(chatId);
const searchTerm = ref('');
const userToUpdate = ref<IUser | undefined>();
const updateUserDialog = ref(false);

const tableHeaders = computed(() => {
  const usersList = users.value;

  if (!usersList || !usersList.length) {
    return [];
  }

  const userHeaders = Object.keys(usersList[0]).map((key) => ({
    title: key,
    key
  }));

  const actionsHeader = {
    title: 'Actions',
    key: 'actions'
  };

  return [...userHeaders, actionsHeader];
});

function showUserUpdateModal(user: IUser) {
  userToUpdate.value = user;
  updateUserDialog.value = true;
}

function handleUpdateDialogClose(user?: IUser) {
  updateUserDialog.value = false;

  if (user) {
    const { name, deleted, banned, moderator } = user;

    mutate({ userId: user.id, user: { name, deleted, banned, moderator } });
  }
}
</script>

<template>
  <VContainer class="fill-height align-start">
    <VAlert v-if="error" title="Something went wrong" :text="error.message" type="error" />

    <VCard v-else class="w-100">
      <template #text>
        <VTextField v-model="searchTerm" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details class="ma-6" />
      </template>
      <VDataTable :headers="tableHeaders" :items="users" :search="searchTerm">
        <template #item.actions="{ item }">
          <VIcon size="small" @click="showUserUpdateModal(item)">mdi-pencil</VIcon>
        </template>
      </VDataTable>
    </VCard>
  </VContainer>
  <EditUserModal v-if="updateUserDialog" :user-to-update="userToUpdate!" @update="handleUpdateDialogClose" />
</template>
