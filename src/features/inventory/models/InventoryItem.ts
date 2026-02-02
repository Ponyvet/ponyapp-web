import z from 'zod'
import { paginatedDataSchema } from '@/shared/models/PaginatedData'

export const inventoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['MEDICATION', 'MATERIAL']),
  unit: z.string(),
  quantity: z.number(),
  expirationDate: z.coerce.date().nullable().optional(),
  medicationId: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  medication: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
})

export type InventoryItem = z.infer<typeof inventoryItemSchema>

export const inventoryPaginatedDataSchema = paginatedDataSchema(inventoryItemSchema)
export type InventoryPaginatedData = z.infer<typeof inventoryPaginatedDataSchema>
