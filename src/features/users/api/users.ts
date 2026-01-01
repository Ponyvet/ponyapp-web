import api from '@/app/api'
import { simpleUserSchema, type SimpleUser } from '../models/User'

export const getUserList = async (): Promise<SimpleUser[]> => {
  const response = await api.get<SimpleUser[]>('/users/list')
  return simpleUserSchema.array().parse(response.data)
}
