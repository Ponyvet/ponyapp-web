import { z } from 'zod'
import { Sex, Species } from '../utils/enum'

export const petsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),

  name: z.string().optional(),
  species: z.enum(Species).optional(),
  sex: z.enum(Sex).optional(),
  breed: z.string().optional(),
  clientId: z.string().optional(),

  sortBy: z
    .enum([
      'name',
      'species',
      'birthDate',
      'createdAt',
      'updatedAt',
      'breed',
      'sex',
    ])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type PetsParams = z.infer<typeof petsQuerySchema>
