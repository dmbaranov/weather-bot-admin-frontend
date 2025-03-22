<script lang="ts" setup>
import { computed, ref, watchEffect, toRaw } from 'vue';
import { set, unset } from 'lodash';
import { useGetChatConfig, useUpdateChatConfig } from '@/entities/chat_config';
import { useGetChatId } from '@/shared/lib';

const chatId = useGetChatId();
const { data: chatConfig } = useGetChatConfig(chatId);
const { mutateAsync: setChatConfig, error: chatConfigUpdateError, isPending: chatConfigUpdating } = useUpdateChatConfig();
const snackbarShown = ref(false);
const conversatorInstructions = ref('');
const newsDisabled = ref<boolean>(false);

watchEffect(() => {
  if (chatConfig.value) {
    conversatorInstructions.value = chatConfig.value.config.conversator?.instructions ?? '';
    newsDisabled.value = chatConfig.value.config.news?.disabled ?? false;
  }
});

const finalConfig = computed(() => {
  const configCopy = structuredClone(toRaw(chatConfig.value?.config ?? {}));
  const updateField = (config: object, path: string, value: unknown) => {
    if (value) set(config, path, value);
    else unset(config, path);
  };

  updateField(configCopy, 'conversator.instructions', conversatorInstructions.value);
  updateField(configCopy, 'news.disabled', newsDisabled.value);

  return JSON.stringify(configCopy);
});

function saveConfig() {
  setChatConfig({ chatId, config: finalConfig.value }).finally(() => {
    snackbarShown.value = true;
  });
}
</script>

<template>
  <div class="w-75 pr-4">
    <VExpansionPanels>
      <VExpansionPanel>
        <VExpansionPanelTitle>Conversator</VExpansionPanelTitle>
        <VExpansionPanelText>
          <VTextarea v-model="conversatorInstructions" label="Instructions" variant="outlined" />
        </VExpansionPanelText>
      </VExpansionPanel>
      <VExpansionPanel>
        <VExpansionPanelTitle>News</VExpansionPanelTitle>
        <VExpansionPanelText>
          <VSwitch v-model="newsDisabled" label="Enabled" />
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>
  </div>
  <VDivider vertical />
  <div class="w-25 pl-4">
    <VCard class="w-100" :text="finalConfig" />
    <VBtn color="blue" :loading="chatConfigUpdating" @click="saveConfig">Save</VBtn>
  </div>
  <VSnackbar v-model="snackbarShown" :timeout="2000">
    <div>{{ chatConfigUpdateError ? `Chat config update failed: ${chatConfigUpdateError.message}` : 'Chat config updated!' }}</div>
  </VSnackbar>
</template>
