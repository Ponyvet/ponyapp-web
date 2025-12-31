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
