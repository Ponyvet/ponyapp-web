import z from 'zod'

export const createClientSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
  address: z.string().nonempty(),
  notes: z.string().optional(),
})

export type CreateClient = z.infer<typeof createClientSchema>
