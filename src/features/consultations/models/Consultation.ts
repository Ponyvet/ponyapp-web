import z from 'zod'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'

export const consultationSchema = z.object({
  id: z.string(),
  reason: z.string().nullable().optional(),
  diagnosis: z.string().nullable().optional(),
  treatment: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  recordId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  record: z.object({
    id: z.string(),
    name: z.string(),
  }),
  visit: z.object({
    id: z.string(),
    date: z.coerce.date(),
    veterinarian: z.object({
      id: z.string(),
      name: z.string(),
    }),
    client: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
})

export type Consultation = z.infer<typeof consultationSchema>

export const consultationsPaginatedDataSchema =
  paginatedDataSchema(consultationSchema)
export type ConsultationsPaginatedData = z.infer<
  typeof consultationsPaginatedDataSchema
>
