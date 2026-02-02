import z from 'zod'

export const inventoryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.enum(['MEDICATION', 'MATERIAL']).optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(['name', 'quantity', 'expirationDate', 'createdAt', 'updatedAt'])
    .default('name')
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type InventoryParams = z.infer<typeof inventoryParamsSchema>
