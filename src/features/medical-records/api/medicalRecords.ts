import api from '@/app/api'
import {
  medicalRecordSchema,
  type MedicalRecord,
} from '../models/MedicalRecord'
import type { CreateMedicalRecord } from '../models/CreateMedicalRecord'
import type { MedicalRecordParams } from '../models/MedicalRecordParams'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'

const paginatedMedicalRecordSchema = paginatedDataSchema(medicalRecordSchema)
export type PaginatedMedicalRecords = ReturnType<
  typeof paginatedMedicalRecordSchema.parse
>

export const getMedicalRecords = async (
  params?: MedicalRecordParams,
): Promise<PaginatedMedicalRecords> => {
  const res = await api.get('/medical-records', { params })
  return paginatedMedicalRecordSchema.parse(res.data)
}

export const getMedicalRecordsByClient = async (
  clientId: string,
): Promise<MedicalRecord[]> => {
  const res = await api.get(`/medical-records/client/${clientId}`)
  return medicalRecordSchema.array().parse(res.data)
}

export const getSingleMedicalRecord = async (
  id: string,
): Promise<MedicalRecord> => {
  const res = await api.get(`/medical-records/${id}`)
  return medicalRecordSchema.parse(res.data)
}

export const createMedicalRecord = async (
  data: CreateMedicalRecord,
): Promise<MedicalRecord> => {
  const res = await api.post('/medical-records', data)
  return medicalRecordSchema.parse(res.data)
}

export const updateMedicalRecord = async (
  id: string,
  data: CreateMedicalRecord,
): Promise<MedicalRecord> => {
  const res = await api.put(`/medical-records/${id}`, data)
  return medicalRecordSchema.parse(res.data)
}

export const deleteMedicalRecord = async (id: string): Promise<void> => {
  await api.delete(`/medical-records/${id}`)
}
