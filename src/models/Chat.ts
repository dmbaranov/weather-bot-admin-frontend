import { Platform } from './Platform';

export interface IChat {
  id: string;
  platform: Platform;
  name: string;
  swearwordsConfig: string;
}
