import { z } from 'zod'
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../utils/const'

const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
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
