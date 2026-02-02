import api from '@/app/api'
import { userSchema, type User } from '../models/User'
import type { CreateUser, UpdateUser } from '../models/CreateUser'

export const getUserList = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users/list')
  return userSchema.array().parse(response.data)
}

export const getSingleUser = async (id: User['id']): Promise<User> => {
  const res = await api.get(`/users/${id}`)
  return userSchema.parse(res.data)
}

export const createUser = async (data: CreateUser): Promise<User> => {
  const res = await api.post('/users', data)
  return userSchema.parse(res.data)
}

export const updateUser = async (
  id: User['id'],
  data: UpdateUser,
): Promise<User> => {
  const res = await api.put(`/users/${id}`, data)
  return userSchema.parse(res.data)
}

export const deleteUser = async (id: User['id']): Promise<void> => {
  await api.delete(`/users/${id}`)
}
