<script setup lang="ts">
import { IUser } from '@/models/User';
import { ref } from 'vue';

type UpdatableUser = Pick<IUser, 'name' | 'deleted' | 'banned' | 'moderator'>;

const { userToUpdate } = defineProps<{ userToUpdate: IUser }>();
const emit = defineEmits<{
  update: [user?: IUser];
}>();

const updatedUser = ref<UpdatableUser>({ ...userToUpdate });

function handleWindowClose(shouldUpdate: boolean) {
  const fullUser: IUser = { ...userToUpdate, ...updatedUser.value };
  emit('update', shouldUpdate ? fullUser : undefined);
}

function updateUserData<K extends keyof UpdatableUser>(field: K, value: IUser[K]) {
  updatedUser.value[field] = value;
}
</script>

<template>
  <VDialog max-width="500" :model-value="true">
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
      <VTextField label="Name" :model-value="userToUpdate?.name" variant="outlined" @update:model-value="updateUserData('name', $event)" />
      <template #actions>
        <VBtn text="Cancel" @click="handleWindowClose(false)" />
        <VBtn text="Save" @click="handleWindowClose(true)" />
      </template>
    </VCard>
  </VDialog>
</template>
