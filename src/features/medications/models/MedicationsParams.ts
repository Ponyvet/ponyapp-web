import z from 'zod'

import { MedicationCategory, Species } from '../utils/enum'

export const medicationsParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  name: z.string().optional(),
  category: z.enum(MedicationCategory).optional(),
  species: z.enum(Species).optional(),
  isActive: z.coerce.boolean().optional(),
  sortBy: z
    .enum(['name', 'category', 'species', 'createdAt', 'updatedAt'])
    .default('name')
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type MedicationsParams = z.infer<typeof medicationsParamsSchema>
