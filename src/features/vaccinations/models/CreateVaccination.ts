import z from 'zod'
import { VaccinationStatus } from '../utils/enum'

export const createVaccinationSchema = z.object({
  appliedAt: z.date(),
  nextDueDate: z.date().optional(),
  status: z.enum(VaccinationStatus),
  petId: z.string(),
  vaccineId: z.string(),
  veterinarianId: z.string(),
})

export type CreateVaccination = z.infer<typeof createVaccinationSchema>
