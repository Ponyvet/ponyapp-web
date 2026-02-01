import api from '@/app/api'

import {
  medicationSchema,
  medicationsPaginatedDataSchema,
  type Medication,
  type MedicationsPaginatedData,
} from '../models/Medication'
import type { CreateMedication } from '../models/CreateMedication'
import type { MedicationsParams } from '../models/MedicationsParams'

export const getMedications = async (
  params?: MedicationsParams,
): Promise<MedicationsPaginatedData> => {
  const res = await api.get('/medications', { params })
  return medicationsPaginatedDataSchema.parse(res.data)
}

export const getSingleMedication = async (
  id: Medication['id'],
): Promise<Medication> => {
  const res = await api.get(`/medications/${id}`)
  return medicationSchema.parse(res.data)
}

export const createMedication = async (
  data: CreateMedication,
): Promise<Medication> => {
  const res = await api.post('/medications', data)
  return medicationSchema.parse(res.data)
}

export const updateMedication = async (
  id: Medication['id'],
  data: Partial<CreateMedication>,
): Promise<Medication> => {
  const res = await api.put(`/medications/${id}`, data)
  return medicationSchema.parse(res.data)
}

export const deleteMedication = async (id: Medication['id']): Promise<void> => {
  await api.delete(`/medications/${id}`)
}
