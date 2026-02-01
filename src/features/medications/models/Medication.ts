import z from 'zod'

import { MedicationCategory, Species } from '../utils/enum'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'

export const medicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(MedicationCategory),
  species: z.enum(Species).nullable(),
  defaultIntervalDays: z.number().nullable(),
  notes: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Medication = z.infer<typeof medicationSchema>

export const medicationsPaginatedDataSchema = paginatedDataSchema(medicationSchema)
export type MedicationsPaginatedData = z.infer<typeof medicationsPaginatedDataSchema>
