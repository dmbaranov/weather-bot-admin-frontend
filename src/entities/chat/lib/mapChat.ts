import { getEnumValue } from '@/shared/lib';
import { Platform } from '@/shared/model';
import { GetChatDTO } from '../api/types';
import { ChatSchema } from '../lib/chatSchema.ts';
import { Chat } from '../model/types';

export function mapChat(dto: GetChatDTO): Chat {
  return ChatSchema.parse({
    ...dto,
    platform: getEnumValue(Platform, dto.platform.toUpperCase())
  });
}
