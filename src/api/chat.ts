import type { IChat } from '@/models/Chat'
import { api } from './api'

export const chatApi = {
  getAll() {
    return api.get<IChat[]>('/chats')
  }
}
