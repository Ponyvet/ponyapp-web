import api from '@/app/api'
import {
  visitSchema,
  visitsPaginatedDataSchema,
  type Visit,
  type VisitsPaginatedData,
} from '../models/Visit'
import type { CreateVisit } from '../models/CreateVisit'
import type { VisitsParams } from '../models/VisitsParams'

export const getVisits = async (
  params?: VisitsParams,
): Promise<VisitsPaginatedData> => {
  const res = await api.get('/visits', { params })
  return visitsPaginatedDataSchema.parse(res.data)
}

export const getSingleVisit = async (id: Visit['id']): Promise<Visit> => {
  const res = await api.get(`/visits/${id}`)
  return visitSchema.parse(res.data)
}

export const createVisit = async (data: CreateVisit): Promise<Visit> => {
  const res = await api.post('/visits', data)
  return visitSchema.parse(res.data)
}

export const updateVisit = async (
  id: Visit['id'],
  data: Partial<CreateVisit>,
): Promise<Visit> => {
  const res = await api.put(`/visits/${id}`, data)
  return visitSchema.parse(res.data)
}

export const deleteVisit = async (id: Visit['id']): Promise<void> => {
  await api.delete(`/visits/${id}`)
}
