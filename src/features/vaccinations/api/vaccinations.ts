import api from '@/app/api'
import { vaccinationSchema, type Vaccination } from '../models/Vaccination'
import type { CreateVaccination } from '../models/CreateVaccination'

export const getPetVaccinations = async (
  petId: Vaccination['petId']
): Promise<Vaccination[]> => {
  const res = await api.get(`/vaccination/${petId}`)
  return vaccinationSchema.array().parse(res.data)
}

export const createVaccination = async (
  data: CreateVaccination
): Promise<Vaccination> => {
  const res = await api.post('/vaccination', data)
  return vaccinationSchema.parse(res.data)
}
