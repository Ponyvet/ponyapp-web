import api from '@/app/api'
import { clientSchema, type Client } from '@/features/clients/models/Client'
import type { CreateClient } from '../models/CreateClient'

export const getClients = async (): Promise<Client[]> => {
  const res = await api.get('/clients')
  return clientSchema.array().parse(res.data)
}

export const createClient = async (data: CreateClient): Promise<Client> => {
  const res = await api.post('/clients', data)
  return clientSchema.parse(res.data)
}

export const updateClient = async (
  id: string,
  data: CreateClient,
): Promise<Client> => {
  const res = await api.put(`/clients/${id}`, data)
  return clientSchema.parse(res.data)
}

export const getSingleClient = async (id: string): Promise<Client> => {
  const res = await api.get(`/clients/${id}`)
  return clientSchema.parse(res.data)
}

export const deleteClient = async (id: string): Promise<void> => {
  await api.delete(`/clients/${id}`)
}
