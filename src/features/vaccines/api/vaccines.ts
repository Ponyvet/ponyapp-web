import api from '@/app/api'
import { vaccineSchema, type Vaccine } from '../models/Vaccine'
import type { CreateVaccine } from '../models/CreateVaccine'

export const getVaccines = async (): Promise<Vaccine[]> => {
  const res = await api.get('/vaccines')
  return vaccineSchema.array().parse(res.data)
}

export const createVaccine = async (data: CreateVaccine): Promise<Vaccine> => {
  const res = await api.post('/vaccines', data)
  return vaccineSchema.parse(res.data)
}

export const updateVaccine = async (
  id: string,
  data: CreateVaccine,
): Promise<Vaccine> => {
  const res = await api.put(`/vaccines/${id}`, data)
  return vaccineSchema.parse(res.data)
}

export const getSingleVaccine = async (id: string): Promise<Vaccine> => {
  const res = await api.get(`/vaccines/${id}`)
  return vaccineSchema.parse(res.data)
}

export const deleteVaccine = async (id: string): Promise<void> => {
  await api.delete(`/vaccines/${id}`)
}
