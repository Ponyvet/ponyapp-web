import z from 'zod'

import { Sex, Species } from '../utils/enum'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'

export const petSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.enum(Species),
  sex: z.enum(Sex),
  breed: z.string().nullable(),
  birthDate: z.coerce.date().nullable(),
  color: z.string().nullable(),
  notes: z.string().nullable(),
  clientId: z.string(),
  client: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Pet = z.infer<typeof petSchema>

export const petsPaginatedDataSchema = paginatedDataSchema(petSchema)
export type PetsPaginatedData = z.infer<typeof petsPaginatedDataSchema>
