import { sessionSchema, type LoginInput, type Session } from '../models/login'

import api from '@/app/api'

export const getProfile = async (): Promise<Session> => {
  const res = await api.post('/auth/profile')
  return sessionSchema.parse(res.data)
}

export const login = (data: LoginInput) => {
  return api.post('/auth/login', data)
}

export const logout = () => {
  return api.post('/auth/logout')
}
