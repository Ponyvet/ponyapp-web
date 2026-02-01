import z from 'zod'

export const medicationSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['VACCINE', 'ANTIBIOTIC', 'OTHER']),
  species: z.enum(['DOG', 'CAT']).nullable().optional(),
  defaultIntervalDays: z.number().int().nonnegative().nullable().optional(),
  notes: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Medication = z.infer<typeof medicationSchema>
