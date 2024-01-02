import { Platform } from './Platform'

export interface Chat {
  id: string
  platform: Platform
  name: string
  swearwordsConfig: string
}
