import z from 'zod'

import { Species } from '@/features/pets/utils/enum'

export const createVaccineSchema = z.object({
  name: z.string().nonempty(),
  species: z.enum(Species),
  type: z.string().nonempty(),
  intervalDays: z.coerce.number().positive(),
})

export type CreateVaccine = z.infer<typeof createVaccineSchema>
