<script setup lang="ts">
import { ref } from 'vue';
import { updateChatUser, User } from '@/entities/user';

type UpdatableUser = Pick<User, 'name' | 'deleted' | 'banned' | 'moderator'>;

const props = defineProps<{ chatId: string; userToUpdate: User }>();
const emit = defineEmits<{ close: [] }>();
const { mutate } = updateChatUser(props.chatId);
const updatedUser = ref<UpdatableUser>({ ...props.userToUpdate });

function updateUserData<K extends keyof UpdatableUser>(field: K, value: User[K]) {
  updatedUser.value[field] = value;
}

function updateUser() {
  const { name, deleted, banned, moderator } = updatedUser.value;

  mutate({ userId: props.userToUpdate.id, user: { name, deleted, banned, moderator } });
  emit('close');
}
</script>

<template>
  <VDialog max-width="500" :model-value="true">
    <VForm @submit.prevent="updateUser">
      <VCard title="Update user">
        <VTextField label="ID" :model-value="userToUpdate?.id" variant="outlined" readonly />
        <VTextField label="ChatID" :model-value="userToUpdate?.chatId" variant="outlined" readonly />
        <VContainer class="d-flex align-center">
          <span>Premium:</span>
          <VRadioGroup inline :model-value="String(userToUpdate?.isPremium)" readonly class="d-flex">
            <VRadio label="True" value="true" />
            <VRadio label="False" value="false" />
          </VRadioGroup>
        </VContainer>
        <VTextField
          label="Name"
          :model-value="userToUpdate?.name"
          variant="outlined"
          @update:model-value="updateUserData('name', $event)"
        />
        <template #actions>
          <VBtn text="Cancel" @click="emit('close')" />
          <VBtn type="submit" text="Save" />
        </template>
      </VCard>
    </VForm>
  </VDialog>
</template>
