import api from '@/app/api'
import { vaccineSchema, type Vaccine } from '../models/Vaccine'

export const getVaccines = async (): Promise<Vaccine[]> => {
  const res = await api.get('/vaccines')
  return vaccineSchema.array().parse(res.data)
}
