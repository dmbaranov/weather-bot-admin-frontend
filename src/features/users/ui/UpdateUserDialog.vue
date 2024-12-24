<script setup lang="ts">
import { ref } from 'vue';
import { updateChatUser, User } from '@/entities/user';

type UpdatableUser = Pick<User, 'name' | 'deleted' | 'banned' | 'moderator'>;

const { chatId, userToUpdate } = defineProps<{ chatId: string; userToUpdate: User }>();
const emit = defineEmits<{ close: [] }>();
const { mutate } = updateChatUser(chatId);
const updatedUser = ref<UpdatableUser>({ ...userToUpdate });

function updateUserData<K extends keyof UpdatableUser>(field: K, value: User[K]) {
  updatedUser.value[field] = value;
}

function updateUser() {
  const { name, deleted, banned, moderator } = updatedUser.value;

  mutate({ userId: userToUpdate.id, user: { name, deleted, banned, moderator } });
  emit('close');
}
</script>

<template>
  <VDialog max-width="500" :model-value="true">
    <VForm @submit.prevent="updateUser">
      <VCard title="Update user" class="pa-5">
        <VTextField label="ID" :model-value="userToUpdate?.id" variant="outlined" readonly />
        <VTextField label="ChatID" :model-value="userToUpdate?.chatId" variant="outlined" readonly />
        <VTextField
          label="Name"
          :model-value="userToUpdate?.name"
          variant="outlined"
          @update:model-value="updateUserData('name', $event)"
        />
        <VCheckbox label="isPremium" :model-value="userToUpdate?.isPremium" readonly />
        <VDivider />
        <VCheckbox label="deleted" :model-value="updatedUser?.deleted" @update:model-value="updateUserData('deleted', Boolean($event))" />
        <VCheckbox label="banned" :model-value="updatedUser?.banned" @update:model-value="updateUserData('banned', Boolean($event))" />
        <VCheckbox
          label="moderator"
          :model-value="updatedUser?.moderator"
          @update:model-value="updateUserData('moderator', Boolean($event))"
        />
        <template #actions>
          <VBtn text="Cancel" @click="emit('close')" />
          <VBtn type="submit" text="Save" />
        </template>
      </VCard>
    </VForm>
  </VDialog>
</template>
