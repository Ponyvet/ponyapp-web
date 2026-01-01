import api from '@/app/api'
import { vaccinationSchema, type Vaccination } from '../models/Vaccination'

export const getPetVaccinations = async (
  petId: Vaccination['petId']
): Promise<Vaccination[]> => {
  const res = await api.get(`/vaccination/${petId}`)
  return vaccinationSchema.array().parse(res.data)
}
