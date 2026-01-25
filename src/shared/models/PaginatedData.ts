import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  total: z.number().positive(),
  totalPages: z.number().min(1),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
})

export const paginatedDataSchema = <T extends z.ZodTypeAny>(itemSchema: T) => {
  return z.object({
    data: z.array(itemSchema),
    pagination: paginationSchema,
  })
}
