import z from 'zod'

export const vaccineSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.string(),
  type: z.string(),
  intervalDays: z.number().int().nonnegative(),
})

export type Vaccine = z.infer<typeof vaccineSchema>
