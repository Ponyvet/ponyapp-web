import z from 'zod'

export const createInventoryItemSchema = z.object({
  name: z.string().nonempty('El nombre es obligatorio'),
  category: z.enum(['MEDICATION', 'MATERIAL']),
  unit: z.string().nonempty('La unidad es obligatoria'),
  quantity: z.coerce.number().min(0, 'La cantidad debe ser mayor o igual a 0'),
  expirationDate: z.coerce.date().optional().nullable(),
  medicationId: z.string().optional().nullable(),
})

export type CreateInventoryItem = z.infer<typeof createInventoryItemSchema>
