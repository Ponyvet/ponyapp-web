import z from 'zod'

import { Sex, Species } from '../utils/enum'

export const petSchema = z.object({
  id: z.string(),
  species: z.enum(Species),
  sex: z.enum(Sex),
  breed: z.string().nullable(),
  birthDate: z.coerce.date().nullable(),
  color: z.string().nullable(),
  notes: z.string().nullable(),
  recordId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Pet = z.infer<typeof petSchema>
