import discord from '@/app/icons/components/discord-icon.vue';
import telegram from '@/app/icons/components/telegram-icon.vue';
import type { IconProps, IconSet } from 'vuetify';
import { type Component, h } from 'vue';

const customSvgIcons: Record<string, Component> = {
  discord,
  telegram
};

export const customIconSet: IconSet = {
  component: (props: IconProps) => h(props.tag, [h(customSvgIcons[props.icon as string], { class: 'v-icon__svg' })])
};
