import z from 'zod'

import { Sex, Species } from '../utils/enum'

export const petSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.enum(Species),
  sex: z.enum(Sex),
  breed: z.string().nullable(),
  birthDate: z.coerce.date().nullable(),
  clientId: z.string(),
})

export type Pet = z.infer<typeof petSchema>
