import { sessionSchema, type LoginInput, type Session } from '../models/login'

import api from '@/app/api'

export const getProfile = async (): Promise<Session | null> => {
  const res = await api.get('/api/auth/get-session')
  if (!res.data) return null
  return sessionSchema.parse(res.data.user)
}

export const login = (data: LoginInput) => {
  return api.post('/api/auth/sign-in/email', data)
}

export const logout = () => {
  return api.post('/api/auth/sign-out')
}
