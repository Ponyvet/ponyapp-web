import z from 'zod'

export const animalGroupSchema = z.object({
  id: z.string(),
  animalType: z.string(),
  quantity: z.number(),
  notes: z.string().nullable(),
  recordId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
