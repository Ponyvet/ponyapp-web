import api from '@/app/api'
import { medicationSchema, type Medication } from '../models/Medication'

export const getMedications = async (): Promise<Medication[]> => {
  const res = await api.get('/medications')
  return medicationSchema.array().parse(res.data.data)
}

export const getSingleMedication = async (id: string): Promise<Medication> => {
  const res = await api.get(`/medications/${id}`)
  return medicationSchema.parse(res.data)
}
