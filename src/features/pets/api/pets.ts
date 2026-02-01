import api from '@/app/api'

import { petSchema, type Pet } from '../models/Pet'
import type { CreatePet } from '../models/CreatePet'

export const createPet = async (data: CreatePet): Promise<Pet> => {
  const res = await api.post('/pets', data)
  return petSchema.parse(res.data)
}

export const getSinglePet = async (petId: Pet['id']): Promise<Pet> => {
  const res = await api.get(`/pets/${petId}`)
  return petSchema.parse(res.data)
}

export const updatePet = async (
  petId: Pet['id'],
  data: Partial<CreatePet>,
): Promise<Pet> => {
  const res = await api.put(`/pets/${petId}`, data)
  return petSchema.parse(res.data)
}

export const deletePet = async (petId: Pet['id']): Promise<void> => {
  await api.delete(`/pets/${petId}`)
}
