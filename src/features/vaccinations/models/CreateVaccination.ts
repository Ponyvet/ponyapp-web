import z from 'zod'
import { VaccinationStatus } from '../utils/enum'

export const createVaccinationSchema = z
  .object({
    appliedAt: z.date().nullable(),
    nextDueDate: z.date().nullable(),
    status: z.enum(VaccinationStatus),
    petId: z.string().nonempty('La mascota es obligatoria'),
    vaccineId: z.string().nonempty('La vacuna es obligatoria'),
    veterinarianId: z.string().nonempty('El veterinario es obligatorio'),
  })
  .superRefine((data, ctx) => {
    if (!data.appliedAt && !data.nextDueDate) {
      ctx.addIssue({
        path: ['appliedAt'],
        code: 'custom',
        message:
          'Debe proporcionar al menos una de las fechas: fecha de aplicación o próxima fecha de vacunación',
      })
      ctx.addIssue({
        path: ['nextDueDate'],
        code: 'custom',
        message:
          'Debe proporcionar al menos una de las fechas: fecha de aplicación o próxima fecha de vacunación',
      })
    }
    if (
      data.nextDueDate &&
      data.appliedAt &&
      data.nextDueDate <= data.appliedAt
    ) {
      ctx.addIssue({
        path: ['nextDueDate'],
        code: 'custom',
        message:
          'La próxima fecha de vacunación debe ser posterior o igual a la fecha de aplicación',
      })
    }
  })

export type CreateVaccination = z.infer<typeof createVaccinationSchema>
