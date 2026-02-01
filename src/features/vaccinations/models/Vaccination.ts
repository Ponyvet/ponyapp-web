import z from 'zod'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'
import { medicationSchema } from '@/features/medications/models/Medication'

export const vaccinationSchema = z.object({
  id: z.string(),
  appliedAt: z.coerce.date().nullable(),
  nextDueDate: z.coerce.date().nullable(),
  medicationId: z.string(),
  veterinarianId: z.string(),
  recordId: z.string().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medication: medicationSchema.pick({ id: true, name: true }),
  record: z.object({
    id: z.string(),
    client: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  veterinarian: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

export type Vaccination = z.infer<typeof vaccinationSchema>

export const vaccinationsPaginatedDataSchema =
  paginatedDataSchema(vaccinationSchema)
export type VaccinationsPaginatedData = z.infer<
  typeof vaccinationsPaginatedDataSchema
>
