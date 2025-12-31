import api from '@/app/api'

import { petSchema, type Pet } from '../models/Pet'
import type { Client } from '@/features/clients/models/Client'

export const getClientPets = async (clientId: Client['id']): Promise<Pet[]> => {
  const res = await api.get(`/pets/client/${clientId}`)
  return petSchema.array().parse(res.data)
}
