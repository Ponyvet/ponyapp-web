import z from 'zod'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'

export const visitSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  generalNotes: z.string().nullable().optional(),
  veterinarianId: z.string(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  veterinarian: z.object({
    id: z.string(),
    name: z.string(),
  }),
  client: z.object({
    id: z.string(),
    name: z.string(),
  }),
  consultations: z
    .array(
      z.object({
        id: z.string(),
        reason: z.string().nullable().optional(),
        diagnosis: z.string().nullable().optional(),
        treatment: z.string().nullable().optional(),
        notes: z.string().nullable().optional(),
        record: z.object({
          id: z.string(),
          name: z.string(),
        }),
      }),
    )
    .optional(),
})

export type Visit = z.infer<typeof visitSchema>

export const visitsPaginatedDataSchema = paginatedDataSchema(visitSchema)
export type VisitsPaginatedData = z.infer<typeof visitsPaginatedDataSchema>
