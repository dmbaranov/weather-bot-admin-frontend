import { GetChatConfigDTO } from '../api/types';
import { ChatConfig } from '../model/types';
import { ChatConfigSchema } from '../lib/chatConfigSchema';

export function mapChatConfig(dto: GetChatConfigDTO): ChatConfig {
  return ChatConfigSchema.parse({
    ...dto,
    config: JSON.parse(dto.config)
  });
}
