import z from 'zod'
import { VaccinationStatus } from '../utils/enum'

export const createVaccinationSchema = z
  .object({
    appliedAt: z.date(),
    nextDueDate: z.date().nullable(),
    status: z.enum(VaccinationStatus),
    petId: z.string().nonempty('La mascota es obligatoria'),
    vaccineId: z.string().nonempty('La vacuna es obligatoria'),
    veterinarianId: z.string().nonempty('El veterinario es obligatorio'),
  })
  .superRefine((data, ctx) => {
    if (!data.nextDueDate) {
      ctx.addIssue({
        path: ['nextDueDate'],
        code: 'custom',
        message: 'La próxima fecha de vacunación es obligatoria',
      })
    }
    if (data.nextDueDate && data.nextDueDate <= data.appliedAt) {
      ctx.addIssue({
        path: ['nextDueDate'],
        code: 'custom',
        message:
          'La próxima fecha de vacunación debe ser posterior a la fecha de aplicación',
      })
    }
  })

export type CreateVaccination = z.infer<typeof createVaccinationSchema>
