import { getEnumValue } from '@/shared';
import { Platform } from '@/shared';
import { GetChatDTO } from '../api/types';
import { ChatSchema } from '../lib/chatSchema.ts';
import { Chat } from '../model/types';

export function mapChat(dto: GetChatDTO): Chat {
  return ChatSchema.parse({
    ...dto,
    platform: getEnumValue(Platform, dto.platform.toUpperCase())
  });
}
