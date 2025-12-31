import api from '@/app/api'
import { clientSchema, type Client } from '@/features/models/Client'

export const getClients = async (): Promise<Client[]> => {
  const res = await api.get('/clients')
  return clientSchema.array().parse(res.data)
}
