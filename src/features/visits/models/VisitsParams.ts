import z from 'zod'

export const visitsParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  clientId: z.string().optional(),
  veterinarianId: z.string().optional(),
  sortBy: z
    .enum(['date', 'createdAt', 'updatedAt'])
    .default('date')
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type VisitsParams = z.infer<typeof visitsParamsSchema>
