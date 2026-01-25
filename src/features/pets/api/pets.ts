import api from '@/app/api'

import {
  petSchema,
  petsPaginatedDataSchema,
  type Pet,
  type PetsPaginatedData,
} from '../models/Pet'
import type { Client } from '@/features/clients/models/Client'
import type { CreatePet } from '../models/CreatePet'
import type { PetsParams } from '../models/PetsParams'

export const getClientPets = async (clientId: Client['id']): Promise<Pet[]> => {
  const res = await api.get(`/pets/client/${clientId}`)
  return petSchema.array().parse(res.data)
}

export const getAllPets = async (
  params: PetsParams,
): Promise<PetsPaginatedData> => {
  const res = await api.get('/pets', { params })
  return petsPaginatedDataSchema.parse(res.data)
}

export const createPet = async (data: CreatePet): Promise<Pet> => {
  const res = await api.post('/pets', data)
  return petSchema.parse(res.data)
}

export const getSinglePet = async (petId: Pet['id']): Promise<Pet> => {
  const res = await api.get(`/pets/${petId}`)
  return petSchema.parse(res.data)
}
