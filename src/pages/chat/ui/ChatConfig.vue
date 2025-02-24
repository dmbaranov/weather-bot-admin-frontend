<script lang="ts" setup>
import { computed, ref } from 'vue';
import { set } from 'lodash';

interface ChatConfig {
  conversator?: {
    instructions?: string;
  };
  news?: {
    disabled?: boolean;
  };
}

const conversatorInstructions = ref('');
const newsDisabled = ref<boolean>(false);

const finalConfig = computed(() => {
  const config: ChatConfig = {};

  if (conversatorInstructions.value) set(config, 'conversator.instructions', conversatorInstructions.value);
  if (newsDisabled.value) set(config, 'newsDisabled.value', newsDisabled.value);

  return JSON.stringify(config);
});
</script>

<template>
  <VContainer class="fill-height flex-nowrap">
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
    </div>
  </VContainer>
</template>
