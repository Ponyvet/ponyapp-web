import api from '@/app/api'
import {
  vaccinationSchema,
  vaccinationsPaginatedDataSchema,
  type Vaccination,
  type VaccinationsPaginatedData,
} from '../models/Vaccination'
import type { CreateVaccination } from '../models/CreateVaccination'
import type { VaccinationsParams } from '../models/VaccinationsParams'

export const getVaccinations = async (
  params?: VaccinationsParams,
): Promise<VaccinationsPaginatedData> => {
  const res = await api.get('/vaccinations', { params })
  return vaccinationsPaginatedDataSchema.parse(res.data)
}

export const getSingleVaccination = async (
  id: Vaccination['id'],
): Promise<Vaccination> => {
  const res = await api.get(`/vaccinations/${id}`)
  return vaccinationSchema.parse(res.data)
}

export const getRecordVaccinations = async (
  recordId: Vaccination['recordId'],
): Promise<Vaccination[]> => {
  const res = await api.get(`/vaccinations/record/${recordId}`)
  return vaccinationSchema.array().parse(res.data)
}

export const createVaccination = async (
  data: CreateVaccination,
): Promise<Vaccination> => {
  const res = await api.post('/vaccinations', data)
  return vaccinationSchema.parse(res.data)
}

export const updateVaccination = async (
  id: Vaccination['id'],
  data: Partial<CreateVaccination>,
): Promise<Vaccination> => {
  const res = await api.put(`/vaccinations/${id}`, data)
  return vaccinationSchema.parse(res.data)
}

export const deleteVaccination = async (
  id: Vaccination['id'],
): Promise<void> => {
  await api.delete(`/vaccinations/${id}`)
}
