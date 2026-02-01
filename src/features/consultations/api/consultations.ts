import api from '@/app/api'
import {
  consultationSchema,
  consultationsPaginatedDataSchema,
  type Consultation,
  type ConsultationsPaginatedData,
} from '../models/Consultation'
import type { CreateConsultation } from '../models/CreateConsultation'
import type { ConsultationsParams } from '../models/ConsultationsParams'

export const getConsultations = async (
  params?: ConsultationsParams,
): Promise<ConsultationsPaginatedData> => {
  const res = await api.get('/consultations', { params })
  return consultationsPaginatedDataSchema.parse(res.data)
}

export const getSingleConsultation = async (
  id: Consultation['id'],
): Promise<Consultation> => {
  const res = await api.get(`/consultations/${id}`)
  return consultationSchema.parse(res.data)
}

export const createConsultation = async (
  data: CreateConsultation,
): Promise<Consultation> => {
  const res = await api.post('/consultations', data)
  return consultationSchema.parse(res.data)
}

export const updateConsultation = async (
  id: Consultation['id'],
  data: Partial<CreateConsultation>,
): Promise<Consultation> => {
  const res = await api.put(`/consultations/${id}`, data)
  return consultationSchema.parse(res.data)
}

export const deleteConsultation = async (
  id: Consultation['id'],
): Promise<void> => {
  await api.delete(`/consultations/${id}`)
}
