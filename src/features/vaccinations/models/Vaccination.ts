import z from 'zod'
import { VaccinationStatus } from '../utils/enum'

export const vaccinationSchema = z.object({
  id: z.string(),
  appliedAt: z.coerce.date(),
  nextDueDate: z.coerce.date().nullable(),
  status: z.enum(VaccinationStatus),
  petId: z.string(),
  vaccineId: z.string(),
  veterinarianId: z.string(),
})

export type Vaccination = z.infer<typeof vaccinationSchema>
